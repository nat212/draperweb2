import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService, Query, syncQuery } from 'akita-ng-fire';
import { Wishlist } from './wishlist.model';
import { WishlistState, WishlistStore } from './wishlist.store';

const wishlistQuery: Query<Wishlist> = {
  path: 'wishlists',
  items: (wishlist: Wishlist) => ({
    path: `wishlists/${wishlist.id}/items`,
  }),
  user: (wishlist: Wishlist) => ({
    path: `users/${wishlist.userId}`,
  }),
};

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'wishlists' })
export class WishlistService extends CollectionService<WishlistState> {
  public syncQuery = syncQuery.bind(this, wishlistQuery);

  constructor(store: WishlistStore) {
    super(store);
  }
}
