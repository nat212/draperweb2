import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';
import { BudgetColumnService } from './budget-column.service';
import { BudgetColumnState } from './budget-column.store';

@Injectable({ providedIn: 'root' })
export class BudgetColumnGuard extends CollectionGuard<BudgetColumnState> {
  constructor(service: BudgetColumnService) {
    super(service);
  }
}
