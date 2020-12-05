import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewWishlistComponent } from './pages/view-wishlist/view-wishlist.component';
import { WishlistsHomeComponent } from './pages/wishlists-home/wishlists-home.component';
import { WishlistItemGuard } from './state/wishlist-item/wishlist-item.guard';
import { WishlistGuard } from './state/wishlist/wishlist.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [WishlistGuard],
    canDeactivate: [WishlistGuard],
    children: [
      {
        path: '',
        component: WishlistsHomeComponent,
        data: { title: 'Wishlists' },
      },
      {
        path: ':wishlistId',
        component: ViewWishlistComponent,
        data: { title: 'Wishlist' },
        canActivate: [WishlistItemGuard],
        canDeactivate: [WishlistItemGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistsRoutingModule {}
