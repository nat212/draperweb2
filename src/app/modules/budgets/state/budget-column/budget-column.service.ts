import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { BudgetColumnState, BudgetColumnStore } from './budget-column.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'budgets/:budgetId/columns' })
export class BudgetColumnService extends CollectionService<BudgetColumnState> {
  constructor(store: BudgetColumnStore) {
    super(store);
  }
}
