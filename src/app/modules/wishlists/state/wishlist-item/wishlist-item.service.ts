import { Injectable } from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { CollectionConfig, CollectionService, syncWithRouter } from 'akita-ng-fire';
import { WishlistItemState, WishlistItemStore } from './wishlist-item.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'wishlists/:wishlistId/items' })
export class WishlistItemService extends CollectionService<WishlistItemState> {
  constructor(store: WishlistItemStore, private readonly routerQuery: RouterQuery) {
    super(store);
  }

  public sync = syncWithRouter.bind(this, this.routerQuery);
}
