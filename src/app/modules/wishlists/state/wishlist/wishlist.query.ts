import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WishlistState, WishlistStore } from './wishlist.store';

@Injectable({ providedIn: 'root' })
export class WishlistQuery extends QueryEntity<WishlistState> {
  constructor(protected store: WishlistStore) {
    super(store);
  }
}
