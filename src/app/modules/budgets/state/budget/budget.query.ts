import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { BudgetState, BudgetStore } from './budget.store';

@Injectable({
  providedIn: 'root',
})
export class BudgetQuery extends QueryEntity<BudgetState> {
  public years$ = this.selectAll().pipe(
    map((budgets) => budgets.map((b) => b.endDate).filter((d) => !!d)),
    map((dateStrings) => dateStrings.map((str) => new Date(str))),
    map((dates) => [...new Set(dates.map((d) => d.getFullYear()))]),
  );

  constructor(protected store: BudgetStore) {
    super(store);
  }
}
