import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { BudgetState, BudgetStore } from './budget.store';

@Injectable({
  providedIn: 'root',
})
@CollectionConfig({ path: 'budgets' })
export class BudgetService extends CollectionService<BudgetState> {
  constructor(store: BudgetStore) {
    super(store);
  }
}
