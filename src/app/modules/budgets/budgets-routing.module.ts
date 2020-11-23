import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetsHomeComponent } from './pages/budgets-home/budgets-home.component';

const routes: Routes = [{ path: '', component: BudgetsHomeComponent, data: { title: 'Budgets' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetsRoutingModule {}
