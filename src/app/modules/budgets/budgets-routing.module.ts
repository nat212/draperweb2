import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetsHomeComponent } from './pages/budgets-home/budgets-home.component';
import { ViewBudgetComponent } from './pages/view-budget/view-budget.component';
import { ViewColumnComponent } from './pages/view-column/view-column.component';
import { BudgetNameResolverService } from './resolvers/budget-name-resolver.service';
import { BudgetColumnGuard } from './state/budget-column/budget-column.guard';
import { BudgetGuard } from './state/budget/budget.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [BudgetGuard],
    canDeactivate: [BudgetGuard],
    children: [
      { path: '', component: BudgetsHomeComponent, data: { title: 'Budgets' } },
      {
        path: ':budgetId',
        component: ViewBudgetComponent,
        canActivate: [BudgetColumnGuard],
        canDeactivate: [BudgetColumnGuard],
        resolve: { title: BudgetNameResolverService, breadcrumb: BudgetNameResolverService },
      },
      {
        path: ':budgetId/columns/:columnId',
        component: ViewColumnComponent,
        canActivate: [BudgetColumnGuard],
        canDeactivate: [BudgetColumnGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetsRoutingModule {}
