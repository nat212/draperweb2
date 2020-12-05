import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { WishlistItemDialogComponent } from '@modules/wishlists/dialogs/wishlist-item-dialog/wishlist-item-dialog.component';
import { WishlistForms } from '@modules/wishlists/forms';
import { WishlistItem } from '@modules/wishlists/state/wishlist-item/wishlist-item.model';
import { WishlistItemQuery } from '@modules/wishlists/state/wishlist-item/wishlist-item.query';
import { WishlistItemService } from '@modules/wishlists/state/wishlist-item/wishlist-item.service';
import { NgFormsManager } from '@ngneat/forms-manager';
import { AlertService } from '@services/alert.service';
import Fuse from 'fuse.js';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, pluck, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dw-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss'],
})
export class ViewWishlistComponent implements OnInit, OnDestroy {
  private wishlistId: string;
  public items$: Observable<WishlistItem[]>;
  public filterForm: FormGroup;
  public brands$: Observable<string[]>;
  private fuseOpts: Fuse.IFuseOptions<WishlistItem> = { keys: ['name', 'brand', 'link'] };

  private minAmount: number;
  private maxAmount: number;
  private destroyed$ = new Subject<void>();

  constructor(
    private readonly query: WishlistItemQuery,
    private readonly dialog: MatDialog,
    private readonly alert: AlertService,
    private readonly service: WishlistItemService,
    private readonly routerQuery: RouterQuery,
    private readonly formBuilder: FormBuilder,
    private readonly formManager: NgFormsManager<WishlistForms>,
  ) {}

  public ngOnDestroy() {
    this.destroyed$.next();
    this.formManager.unsubscribe('itemsFilter');
  }

  public ngOnInit() {
    this.maxAmount = this.minAmount = null;
    this.filterForm = this.formBuilder.group({
      search: [''],
      brands: [[]],
      amountFrom: [null],
      amountTo: [null],
    });
    this.formManager.upsert('itemsFilter', this.filterForm, { persistState: true });

    const items$ = this.formManager.valueChanges('itemsFilter').pipe(
      map(({ brands, amountFrom, amountTo }) => ({ brands, amountFrom, amountTo })),
      distinctUntilChanged(),
      switchMap(({ brands, amountFrom, amountTo }) => this.query.filter({ brands, amountTo, amountFrom })),
    );

    const itemsFuse$ = items$.pipe(
      map((items) => {
        const index = Fuse.createIndex(this.fuseOpts.keys, items);
        const fuse = new Fuse(items, this.fuseOpts, index);
        return { fuse, items };
      }),
    );

    this.query.minMaxAmounts$.pipe(takeUntil(this.destroyed$), distinctUntilChanged()).subscribe(({ min, max }) => {
      const amountFrom = this.filterForm.value.amountFrom === this.minAmount ? min : this.filterForm.value.amountFrom;
      const amountTo = this.filterForm.value.amountTo === this.maxAmount ? max : this.filterForm.value.amountTo;
      this.filterForm.patchValue({ amountFrom, amountTo });
      this.minAmount = min;
      this.maxAmount = max;
    });

    this.items$ = combineLatest([
      itemsFuse$,
      this.formManager.valueChanges('itemsFilter', 'search').pipe(distinctUntilChanged(), debounceTime(500)),
    ]).pipe(map(([{ fuse, items }, searchTerm]) => (searchTerm ? fuse.search(searchTerm).map((i) => i.item) : items)));

    this.brands$ = this.query.brands$;

    this.routerQuery.selectParams('wishlistId').subscribe((wishlistId: string) => (this.wishlistId = wishlistId));
  }

  public addWishlistItem() {
    this.dialog
      .open(WishlistItemDialogComponent)
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe((value: Partial<WishlistItem>) => {
        this.service.add(value, { params: { wishlistId: this.wishlistId } });
      });
  }

  public editWishlistItem(item: WishlistItem) {
    this.dialog
      .open(WishlistItemDialogComponent, { data: { ...item } })
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe((value: Partial<WishlistItem>) => {
        this.service.update({ ...value, id: item.id }, { params: { wishlistId: this.wishlistId } });
      });
  }

  public deleteWishlistItem(item: WishlistItem) {
    this.alert
      .messageDialog('Delete Item', `Are you sure you wish to delete ${item.name}? This operation cannot be undone`, true)
      .subscribe((answer) => {
        if (answer) {
          this.service.remove(item.id, { params: { wishlistId: this.wishlistId } });
        }
      });
  }

  public getUrlDomain(item: WishlistItem) {
    const url = new URL(item.link);
    return url.hostname;
  }
}
