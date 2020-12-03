import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { WishlistState, WishlistStore } from './wishlist.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'wishlists' })
export class WishlistService extends CollectionService<WishlistState> {
  constructor(store: WishlistStore) {
    super(store);
  }
}
