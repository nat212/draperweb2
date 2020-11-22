import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { SessionRoutingModule } from './session-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SessionRoutingModule],
})
export class SessionModule {}
