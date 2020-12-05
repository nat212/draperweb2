import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';
import { WishlistItemService } from './wishlist-item.service';
import { WishlistItemState } from './wishlist-item.store';

@Injectable({ providedIn: 'root' })
export class WishlistItemGuard extends CollectionGuard<WishlistItemState> {
  constructor(protected service: WishlistItemService) {
    super(service);
  }

  public sync() {
    return this.service.sync();
  }
}
