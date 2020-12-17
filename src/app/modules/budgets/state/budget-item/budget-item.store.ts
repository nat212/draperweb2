import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { BudgetItem } from './budget-item.model';

export interface BudgetItemState extends CollectionState<BudgetItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'budget-items', resettable: true })
export class BudgetItemStore extends EntityStore<BudgetItemState> {
  constructor() {
    super();
  }
}
