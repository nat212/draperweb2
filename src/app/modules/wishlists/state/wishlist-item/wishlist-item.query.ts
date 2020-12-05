import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WishlistItemState, WishlistItemStore } from './wishlist-item.store';

@Injectable({ providedIn: 'root' })
export class WishlistItemQuery extends QueryEntity<WishlistItemState> {
  constructor(protected store: WishlistItemStore) {
    super(store);
  }
}
