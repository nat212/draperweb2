import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { preventEventBubble } from '@helpers/prevent-bubble.helper';
import { AuthQuery } from '@modules/auth/state/auth/auth.query';
import { WishlistDialogComponent } from '@modules/wishlists/dialogs/wishlist-dialog/wishlist-dialog.component';

import { WishlistForms } from '@modules/wishlists/forms';
import { Wishlist } from '@modules/wishlists/state/wishlist/wishlist.model';
import { WishlistQuery } from '@modules/wishlists/state/wishlist/wishlist.query';
import { WishlistService } from '@modules/wishlists/state/wishlist/wishlist.service';
import { NgFormsManager } from '@ngneat/forms-manager';
import { AlertService } from '@services/alert.service';
import Fuse from 'fuse.js';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, first, map, pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'dw-wishlists-home',
  templateUrl: './wishlists-home.component.html',
  styleUrls: ['./wishlists-home.component.scss'],
})
export class WishlistsHomeComponent implements OnInit, OnDestroy {
  public wishlists$: Observable<Wishlist[]>;
  public filterForm: FormGroup;
  private userId: string;
  private fuseOpts: Fuse.IFuseOptions<Wishlist> = { keys: ['name', 'user.displayName'] };
  public users$: Observable<string[]>;

  constructor(
    private readonly alert: AlertService,
    private readonly auth: AuthQuery,
    private readonly query: WishlistQuery,
    private readonly dialog: MatDialog,
    private readonly service: WishlistService,
    private readonly formBuilder: FormBuilder,
    private readonly formManager: NgFormsManager<WishlistForms>,
  ) {}

  public ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      users: [[]],
      shared: [true],
      search: [''],
    });

    this.formManager.upsert('wishlistsFilter', this.filterForm, { persistState: true });
    const wishlists$ = this.formManager.valueChanges('wishlistsFilter').pipe(
      map(({ users, shared }) => ({ users, shared })),
      switchMap(({ users, shared }) => this.query.filter({ users, shared })),
    );
    const wishlistFuse$ = wishlists$.pipe(
      map((items) => {
        const index = Fuse.createIndex(this.fuseOpts.keys, items);
        const fuse = new Fuse(items, this.fuseOpts, index);
        return { fuse, items };
      }),
    );
    this.wishlists$ = combineLatest([
      wishlistFuse$,
      this.formManager.valueChanges('wishlistsFilter', 'search').pipe(debounceTime(500), distinctUntilChanged()),
    ]).pipe(map(([{ items, fuse }, searchTerm]) => (searchTerm ? fuse.search(searchTerm).map((i) => i.item) : items)));

    this.auth.profile$
      .pipe(
        first((profile) => !!profile),
        pluck('uid'),
      )
      .subscribe((uid: string) => (this.userId = uid));

    this.users$ = this.query.userNames$;
  }

  public ngOnDestroy() {
    this.formManager.unsubscribe('wishlistsFilter');
  }

  public addWishlist() {
    this.dialog
      .open(WishlistDialogComponent)
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe(({ name, shared }) => {
        this.service.add({ name, shared, userId: this.userId });
      });
  }

  public getWishlistAmount(wishlist: Wishlist) {
    return (wishlist.items || []).reduce((curr, i) => (i.amount ?? 0) + curr, 0);
  }

  public getWishlistItemsNumber(wishlist: Wishlist) {
    return wishlist.items?.length ?? 0;
  }

  public editWishlist(wishlist: Wishlist) {
    this.dialog
      .open(WishlistDialogComponent, { data: { ...wishlist } })
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe((value: Partial<Wishlist>) => {
        this.service.update({ ...value, id: wishlist.id, userId: wishlist.userId });
      });
  }

  public deleteWishlist(wishlist: Wishlist) {
    this.alert
      .messageDialog('Delete Wishlist', `Are you sure you wish to delete ${wishlist.name}? This operation cannot be undone.`, true)
      .subscribe((answer) => {
        if (answer) {
          this.service.remove(wishlist.id);
        }
      });
  }

  public preventEventBubble(event: MouseEvent) {
    preventEventBubble(event);
  }
}
