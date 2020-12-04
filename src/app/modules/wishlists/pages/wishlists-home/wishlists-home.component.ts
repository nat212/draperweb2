import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthQuery } from '@modules/auth/state/auth/auth.query';
import { NewWishlistComponent } from '@modules/wishlists/dialogs/new-wishlist/new-wishlist.component';
import { Wishlist } from '@modules/wishlists/state/wishlist/wishlist.model';
import { WishlistQuery } from '@modules/wishlists/state/wishlist/wishlist.query';
import { WishlistService } from '@modules/wishlists/state/wishlist/wishlist.service';
import { Observable } from 'rxjs';
import { filter, first, pluck } from 'rxjs/operators';

@Component({
  selector: 'dw-wishlists-home',
  templateUrl: './wishlists-home.component.html',
  styleUrls: ['./wishlists-home.component.scss'],
})
export class WishlistsHomeComponent implements OnInit {
  public wishlists$: Observable<Wishlist[]>;
  public filterForm: FormGroup;
  private userId: string;
  private userName: string;

  constructor(
    private readonly auth: AuthQuery,
    private readonly query: WishlistQuery,
    private readonly dialog: MatDialog,
    private readonly service: WishlistService,
    private readonly formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      users: [[]],
      shared: [true],
      search: [''],
    });

    this.wishlists$ = this.query.selectAll();
    this.wishlists$.subscribe(console.log);
    this.auth.profile$.pipe(first((profile) => !!profile)).subscribe((profile) => {
      this.userId = profile.uid;
      this.userName = profile.displayName;
    });
  }

  public addWishlist() {
    this.dialog
      .open(NewWishlistComponent)
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe(({ name, shared }) => {
        this.service.add({ name, shared, userId: this.userId, userName: this.userName });
      });
  }
}
