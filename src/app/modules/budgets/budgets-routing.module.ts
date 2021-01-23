import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconGuard } from 'src/app/state/icon/icon.guard';
import { BudgetsHomeComponent } from './pages/budgets-home/budgets-home.component';
import { ImportColumnsComponent } from './pages/import-columns/import-columns.component';
import { ViewBudgetComponent } from './pages/view-budget/view-budget.component';
import { ViewColumnComponent } from './pages/view-column/view-column.component';
import { BudgetColumnNameResolverService } from './resolvers/budget-column-name-resolver.service';
import { BudgetNameResolverService } from './resolvers/budget-name-resolver.service';
import { BudgetColumnGuard } from './state/budget-column/budget-column.guard';
import { BudgetItemGuard } from './state/budget-item/budget-item.guard';
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
        canActivate: [BudgetColumnGuard],
        canDeactivate: [BudgetColumnGuard],
        resolve: { title: BudgetNameResolverService, breadcrumb: BudgetNameResolverService },
        children: [
          { path: '', component: ViewBudgetComponent },
          { path: 'import', component: ImportColumnsComponent, data: { title: 'Import Columns', breadcrumb: 'Import Columns' } },
          {
            path: 'columns/:columnId',
            component: ViewColumnComponent,
            canActivate: [BudgetItemGuard, IconGuard],
            canDeactivate: [BudgetItemGuard, IconGuard],
            resolve: { title: BudgetColumnNameResolverService, breadcrumb: BudgetColumnNameResolverService },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetsRoutingModule {}
