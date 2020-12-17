import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CollectionGuard } from 'akita-ng-fire';
import { BudgetItemService } from './budget-item.service';
import { BudgetItemState } from './budget-item.store';

@Injectable({ providedIn: 'root' })
export class BudgetItemGuard extends CollectionGuard<BudgetItemState> {
  constructor(protected service: BudgetItemService) {
    super(service);
  }

  public sync(next: ActivatedRouteSnapshot) {
    const { budgetId, columnId } = next.params;
    return this.service.sync(budgetId, columnId);
  }
}
