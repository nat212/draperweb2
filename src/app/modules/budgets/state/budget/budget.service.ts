import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService, Query, syncQuery } from 'akita-ng-fire';
import { Budget } from './budget.model';
import { BudgetState, BudgetStore } from './budget.store';

const budgetQuery: Query<Budget> = {
  path: 'budgets',
  columns: (budget: Budget) => ({
    path: `budgets/${budget.id}/columns`,
  }),
};

@Injectable({
  providedIn: 'root',
})
@CollectionConfig({ path: 'budgets' })
export class BudgetService extends CollectionService<BudgetState> {
  public syncQuery = syncQuery.bind(this, budgetQuery);

  constructor(store: BudgetStore) {
    super(store);
  }
}
