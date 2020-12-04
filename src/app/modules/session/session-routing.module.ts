import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@modules/auth/state/auth/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' },
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Home' } },
      {
        path: 'budgets',
        loadChildren: () => import('@modules/budgets/budgets.module').then((m) => m.BudgetsModule),
      },
      {
        path: 'wishlists',
        loadChildren: () => import('@modules/wishlists/wishlists.module').then((m) => m.WishlistsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionRoutingModule {}