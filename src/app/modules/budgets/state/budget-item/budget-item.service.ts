import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService, Query, syncQuery } from 'akita-ng-fire';
import { finalize } from 'rxjs/operators';
import { Category } from '../category/category.model';
import { BudgetItem, BudgetItemModel } from './budget-item.model';
import { BudgetItemState, BudgetItemStore } from './budget-item.store';
import firebase from 'firebase/app';

interface Params {
  budgetId: string;
  columnId: string;
}

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

  public moveItemHigher(item: BudgetItemModel, order: number, items: BudgetItemModel[], params: Params) {
    this.runTransaction((txn) => {
      const updatedItems = items.filter(i => i.order >= order).filter(i => i !== item).sort((a, b) => a.order - b.order);
      const updateFirstItem = this.setItemOrder(item, order, params, txn);
      const updates = updatedItems.map(i => this.setItemOrder(i, i.order + 1, params, txn));
      return Promise.all([updateFirstItem, ...updates]);
    });
  }

  public moveItemLower(item: BudgetItemModel, order: number, items: BudgetItemModel[], params: Params) {
    this.runTransaction((txn) => {
      const updatedItems = items.filter(i => i.order <= order).filter(i => i !== item).sort((a, b) => a.order - b.order);
      const updateFirstItem = this.setItemOrder(item, order, params, txn);
      const updates = updatedItems.map(i => this.setItemOrder(i, i.order - 1, params, txn));
      return Promise.all([updateFirstItem, ...updates]);
    });
  }

  private async setItemOrder(item: BudgetItemModel, order: number, params: any, txn?: firebase.firestore.Transaction) {
    return this.update(item.id, { order }, { write: txn, params });
  }
}
