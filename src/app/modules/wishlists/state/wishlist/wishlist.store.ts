import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { Wishlist } from './wishlist.model';

export interface WishlistState extends CollectionState<Wishlist> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wishlists' })
export class WishlistStore extends EntityStore<WishlistState> {
  constructor() {
    super();
  }
}
