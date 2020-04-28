import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  AngularFireAuthGuard,
} from '@angular/fire/auth-guard';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { TitleGuard } from '@guards/title.guard';

const requireLoggedIn = () => redirectUnauthorizedTo(['login']);
const requireLoggedOut = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home', authGuardPipe: requireLoggedIn },
    canActivate: [TitleGuard, AngularFireAuthGuard],
    canActivateChild: [TitleGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Home' },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login', authGuardPipe: requireLoggedOut },
    canActivate: [TitleGuard, AngularFireAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
