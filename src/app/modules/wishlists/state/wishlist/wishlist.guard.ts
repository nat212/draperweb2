import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CollectionGuard } from 'akita-ng-fire';
import { WishlistService } from './wishlist.service';
import { WishlistState } from './wishlist.store';

@Injectable({ providedIn: 'root' })
export class WishlistGuard extends CollectionGuard<WishlistState> {
  constructor(protected service: WishlistService) {
    super(service);
  }

  public sync(next: ActivatedRouteSnapshot) {
    return this.service.syncQuery();
  }
}
