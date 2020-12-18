import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BudgetColumnQuery } from '../state/budget-column/budget-column.query';

@Injectable({
  providedIn: 'root',
})
export class BudgetColumnNameResolverService implements Resolve<string> {
  constructor(private readonly query: BudgetColumnQuery) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
    const columnId = route.paramMap.get('columnId');
    const budgetColumn = this.query.getEntity(columnId);
    return budgetColumn?.name;
  }
}
