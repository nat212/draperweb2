import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { BudgetColumn } from './budget-column.model';

export interface BudgetColumnState extends CollectionState<BudgetColumn> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'budget-columns' })
export class BudgetColumnStore extends EntityStore<BudgetColumnState> {
  constructor() {
    super();
  }
}
