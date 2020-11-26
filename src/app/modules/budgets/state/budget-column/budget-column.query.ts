import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { BudgetColumnState, BudgetColumnStore } from './budget-column.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({ sortBy: 'name', sortByOrder: Order.ASC })
export class BudgetColumnQuery extends QueryEntity<BudgetColumnState> {
  constructor(protected store: BudgetColumnStore) {
    super(store);
  }

  public selectBudgetColumns(budgetId: string) {
    return this.selectAll({ filterBy: (column) => column.budgetId === budgetId });
  }
}
