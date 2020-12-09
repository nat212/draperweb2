import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CollectionGuard } from 'akita-ng-fire';
import { BudgetColumnService } from './budget-column.service';
import { BudgetColumnState } from './budget-column.store';

@Injectable({ providedIn: 'root' })
export class BudgetColumnGuard extends CollectionGuard<BudgetColumnState> {
  constructor(protected service: BudgetColumnService) {
    super(service);
  }

  protected sync(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.sync(next.paramMap.get('budgetId'));
  }
}
