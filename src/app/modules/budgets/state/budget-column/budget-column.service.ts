import { Injectable } from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { CollectionConfig, CollectionService, Query, syncQuery, syncWithRouter } from 'akita-ng-fire';
import { BudgetColumn } from './budget-column.model';
import { BudgetColumnState, BudgetColumnStore } from './budget-column.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'budgets/:budgetId/columns' })
export class BudgetColumnService extends CollectionService<BudgetColumnState> {
  constructor(store: BudgetColumnStore, private readonly routerQuery: RouterQuery) {
    super(store);
  }

  private buildQuery(budgetId: string): Query<BudgetColumn> {
    return {
      path: `budgets/${budgetId}/columns`,
      items: (column: BudgetColumn) => ({
        path: `budgets/${budgetId}/columns/${column.id}/items`,
      }),
    };
  }

  public sync(budgetId: string) {
    const sync = syncQuery.bind(this, this.buildQuery(budgetId));
    return sync();
  }

}
