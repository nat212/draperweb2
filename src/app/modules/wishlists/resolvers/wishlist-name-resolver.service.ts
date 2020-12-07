import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { WishlistQuery } from '../state/wishlist/wishlist.query';

@Injectable({
  providedIn: 'root',
})
export class WishlistNameResolverService implements Resolve<string> {
  constructor(private readonly query: WishlistQuery) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const wishlistId = route.paramMap.get('wishlistId');
    const wishlist = this.query.getEntity(wishlistId);
    return wishlist?.name;
  }
}
