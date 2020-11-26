import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { BudgetService } from '../state/budget/budget.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetNameResolverService implements Resolve<string> {
  constructor(private service: BudgetService) {}

  public resolve(route: ActivatedRouteSnapshot) {
    const budgetId = route.paramMap.get('id');
    return this.service.syncDoc({ id: budgetId }).pipe(
      take(1),
      map((budget) => budget.name),
    );
  }
}
