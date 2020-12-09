import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CollectionGuard } from 'akita-ng-fire';
import { BudgetService } from './budget.service';
import { BudgetState } from './budget.store';

@Injectable({ providedIn: 'root' })
export class BudgetGuard extends CollectionGuard<BudgetState> {
  constructor(protected service: BudgetService) {
    super(service);
  }

  protected sync(next: ActivatedRouteSnapshot) {
    return this.service.syncQuery();
  }
}
