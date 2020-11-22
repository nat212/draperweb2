import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const redirectToAuth = () => redirectUnauthorizedTo('auth');

const routes: Routes = [
  {
    path: '',
    redirectTo: '/session',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'session',
    loadChildren: () => import('./modules/session/session.module').then((m) => m.SessionModule),
    ...canActivate(redirectToAuth),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
