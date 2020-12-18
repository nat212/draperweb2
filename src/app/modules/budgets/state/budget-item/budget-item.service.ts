import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService, Query, syncQuery } from 'akita-ng-fire';
import { finalize } from 'rxjs/operators';
import { Category } from '../category/category.model';
import { BudgetItem } from './budget-item.model';
import { BudgetItemState, BudgetItemStore } from './budget-item.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'budgets/:budgetId/columns/:columnId/items' })
export class BudgetItemService extends CollectionService<BudgetItemState> {
  constructor(protected store: BudgetItemStore) {
    super(store);
  }

  private buildQuery(budgetId: string, columnId: string): Query<BudgetItem> {
    return {
      path: `budgets/${budgetId}/columns/${columnId}/items`,
      category: (item: BudgetItem) => ({
        path: `categories/${item.categoryId}`,
        icon: (category: Category) => ({
          path: `icons/${category.iconId}`,
        }),
      }),
    };
  }

  public sync(budgetId: string, columnId: string) {
    const sync = syncQuery.bind(this, this.buildQuery(budgetId, columnId));
    return sync().pipe(finalize(() => this.store.reset()));
  }
}
