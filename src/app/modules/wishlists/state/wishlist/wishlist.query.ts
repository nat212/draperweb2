import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { WishlistState, WishlistStore } from './wishlist.store';

interface FilterOptions {
  users: string[];
  shared: boolean;
}

@Injectable({ providedIn: 'root' })
export class WishlistQuery extends QueryEntity<WishlistState> {
  constructor(protected store: WishlistStore) {
    super(store);
  }

  public userNames$ = this.selectAll().pipe(
    map((wishlists) => wishlists.map((w) => w.user?.displayName)),
    map((names) => [...new Set(names)]),
  );

  public filter({ users, shared }: FilterOptions) {
    return this.selectAll().pipe(
      map((items) => (users?.length ? items.filter((i) => users.includes(i.user.displayName)) : items)),
      map((items) => (!shared ? items.filter((i) => !i.shared) : items)),
    );
  }
}
