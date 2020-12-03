import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistsRoutingModule } from './wishlists-routing.module';
import { WishlistsHomeComponent } from './pages/wishlists-home/wishlists-home.component';


@NgModule({
  declarations: [WishlistsHomeComponent],
  imports: [
    CommonModule,
    WishlistsRoutingModule
  ]
})
export class WishlistsModule { }
