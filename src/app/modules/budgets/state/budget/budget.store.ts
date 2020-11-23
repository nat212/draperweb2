import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { Budget } from './budget.model';

export interface BudgetState extends CollectionState<Budget> {}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'budgets' })
export class BudgetStore extends EntityStore<BudgetState> {
  constructor() {
    super();
  }
}
