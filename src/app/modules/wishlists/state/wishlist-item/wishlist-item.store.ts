import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { WishlistItem } from './wishlist-item.model';

export interface WishlistItemState extends CollectionState<WishlistItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wishlist-items', resettable: true })
export class WishlistItemStore extends EntityStore<WishlistItemState> {
  constructor() {
    super();
  }
}
