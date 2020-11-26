import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';
import { BudgetService } from './budget.service';
import { BudgetState } from './budget.store';

@Injectable({ providedIn: 'root' })
export class BudgetGuard extends CollectionGuard<BudgetState> {
  constructor(service: BudgetService) {
    super(service);
  }
}
