import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconGuard } from 'src/app/state/icon/icon.guard';
import { IconsSettingsComponent } from './pages/icons-settings/icons-settings.component';
import { SettingsHomeComponent } from './pages/settings-home/settings-home.component';

const routes: Routes = [
  { path: '', component: SettingsHomeComponent },
  {
    path: 'icons',
    component: IconsSettingsComponent,
    data: { title: 'Icon Settings', breadcrumb: 'Icons' },
    canActivate: [IconGuard],
    canDeactivate: [IconGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
