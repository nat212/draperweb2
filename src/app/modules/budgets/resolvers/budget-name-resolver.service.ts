import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { BudgetQuery } from '../state/budget/budget.query';

@Injectable({
  providedIn: 'root',
})
export class BudgetNameResolverService implements Resolve<string> {
  constructor(private query: BudgetQuery) {}

  public resolve(route: ActivatedRouteSnapshot) {
    const budgetId = route.paramMap.get('budgetId');
    return this.query.getEntity(budgetId)?.name;
  }
}
