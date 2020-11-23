import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { Budget } from './budget.model';
import { BudgetState, BudgetStore } from './budget.store';

@QueryConfig({
  sortBy: 'endDate',
  sortByOrder: Order.ASC,
})
@Injectable({
  providedIn: 'root',
})
export class BudgetQuery extends QueryEntity<BudgetState> {
  constructor(protected store: BudgetStore) {
    super(store);
  }

  public years$ = this.selectAll().pipe(
    map((budgets) => budgets.map((b) => b.endDate || b.startDate)),
    map((dateStrings) => dateStrings.map((str) => str && new Date(str))),
    map((dates) => [...new Set(dates.map((d) => (d ? d.getFullYear() : 'Undated')))]),
    map((years) => years.sort((a, b) => this.sortYears(a, b))),
  );
  private sortYears(a: number | string, b: number | string) {
    return (typeof a === 'number' ? a : -Infinity) - (typeof b === 'number' ? b : -Infinity);
  }

  public filterByYears(years: (string | number)[]) {
    if (!years.length) {
      return this.selectAll();
    }
    const yearsIncludesDate = (date: Date) => (date ? years.includes(date.getFullYear()) : false);
    const selectEntity = (entity: Budget) => {
      const startDate = entity.startDate && new Date(entity.startDate);
      const endDate = entity.endDate && new Date(entity.endDate);
      return startDate || endDate ? yearsIncludesDate(startDate) || yearsIncludesDate(endDate) : years.includes('Undated');
    };
    return this.selectAll({ filterBy: (entity) => selectEntity(entity) });
  }
}
