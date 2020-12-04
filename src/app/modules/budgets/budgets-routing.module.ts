import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetsHomeComponent } from './pages/budgets-home/budgets-home.component';
import { ViewBudgetComponent } from './pages/view-budget/view-budget.component';
import { BudgetNameResolverService } from './resolvers/budget-name-resolver.service';
import { BudgetGuard } from './state/budget/budget.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [BudgetGuard],
    canDeactivate: [BudgetGuard],
    children: [
      { path: '', component: BudgetsHomeComponent, data: { title: 'Budgets' } },
      {
        path: ':id',
        component: ViewBudgetComponent,
        resolve: { title: BudgetNameResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetsRoutingModule {}
