import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';
import { WishlistService } from './wishlist.service';
import { WishlistState } from './wishlist.store';

@Injectable({ providedIn: 'root' })
export class WishlistGuard extends CollectionGuard<WishlistState> {
  constructor(protected service: WishlistService) {
    super(service);
  }

  public sync() {
    return this.service.syncQuery();
  }
}
