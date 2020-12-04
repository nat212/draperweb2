import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NewWishlistComponent } from './dialogs/new-wishlist/new-wishlist.component';
import { WishlistsHomeComponent } from './pages/wishlists-home/wishlists-home.component';
import { WishlistsRoutingModule } from './wishlists-routing.module';

@NgModule({
  declarations: [WishlistsHomeComponent, NewWishlistComponent],
  imports: [
    CommonModule,
    WishlistsRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
  ],
  entryComponents: [NewWishlistComponent],
})
export class WishlistsModule {}
