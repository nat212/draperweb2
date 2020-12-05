import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { WishlistItem } from './wishlist-item.model';
import { WishlistItemState, WishlistItemStore } from './wishlist-item.store';

interface FilterOptions {
  brands: string[];
  amountFrom: number;
  amountTo: number;
}

@Injectable({ providedIn: 'root' })
export class WishlistItemQuery extends QueryEntity<WishlistItemState> {
  constructor(protected store: WishlistItemStore) {
    super(store);
  }

  public brands$ = this.selectAll().pipe(
    map((items) => items.map((i) => i.brand || 'Unbranded')),
    map((brands) => [...new Set(brands)]),
  );

  public minMaxAmounts$ = this.selectAll().pipe(
    map((items) => items.map((i) => i.amount).filter((i) => i !== null)),
    map((amounts) => amounts.sort((a, b) => a - b)),
    map((sorted) => ({ min: sorted[0], max: sorted[sorted.length - 1] })),
  );

  private filterItemByBrand(item: WishlistItem, brands: string[]) {
    return item.brand ? brands.includes(item.brand) : brands.includes('Unbranded');
  }

  public filter({ brands, amountFrom, amountTo }: FilterOptions) {
    return this.selectAll().pipe(
      map((items) => (brands?.length ? items.filter((i) => this.filterItemByBrand(i, brands)) : items)),
      map((items) => (amountFrom !== null ? items.filter((i) => (i.amount !== null ? i.amount >= amountFrom : true)) : items)),
      map((items) => (amountTo !== null ? items.filter((i) => (i.amount !== null ? i.amount <= amountTo : true)) : items)),
    );
  }
}
