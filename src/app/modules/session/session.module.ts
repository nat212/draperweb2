import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SessionRoutingModule } from './session-routing.module';

// Material Imports
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '@modules/shared/shared.module';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent, BreadcrumbsComponent],
  imports: [
    CommonModule,
    SessionRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    GridModule,
    MatListModule,
    MatGridListModule,
    SharedModule,
  ],
})
export class SessionModule {}
