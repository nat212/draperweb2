import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryGuard } from '@modules/budgets/state/category/category.guard';
import { IconGuard } from 'src/app/state/icon/icon.guard';
import { CategorySettingsComponent } from './pages/category-settings/category-settings.component';
import { IconsSettingsComponent } from './pages/icons-settings/icons-settings.component';
import { SettingsHomeComponent } from './pages/settings-home/settings-home.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsHomeComponent,
    children: [
      {
        path: 'icons',
        component: IconsSettingsComponent,
        data: { title: 'Icon Settings', breadcrumb: 'Icons' },
        canActivate: [IconGuard],
        canDeactivate: [IconGuard],
      },
      {
        path: 'budgets/categories',
        data: { title: 'Categories', breadcrumb: 'Categories' },
        component: CategorySettingsComponent,
        canActivate: [CategoryGuard, IconGuard],
        canDeactivate: [CategoryGuard, IconGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
