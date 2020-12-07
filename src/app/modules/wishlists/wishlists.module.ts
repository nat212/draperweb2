import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '@modules/shared/shared.module';
import { WishlistDialogComponent } from './dialogs/wishlist-dialog/wishlist-dialog.component';
import { WishlistItemDialogComponent } from './dialogs/wishlist-item-dialog/wishlist-item-dialog.component';
import { ViewWishlistComponent } from './pages/view-wishlist/view-wishlist.component';
import { WishlistsHomeComponent } from './pages/wishlists-home/wishlists-home.component';
import { WishlistsRoutingModule } from './wishlists-routing.module';

@NgModule({
  declarations: [WishlistsHomeComponent, WishlistDialogComponent, ViewWishlistComponent, WishlistItemDialogComponent],
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
    MatExpansionModule,
    SharedModule,
    MatDividerModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [WishlistDialogComponent],
})
export class WishlistsModule {}
