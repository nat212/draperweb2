import { Component, OnInit } from '@angular/core';
import { AuthQuery } from '@modules/auth/state/auth/auth.query';
import { Wishlist } from '@modules/wishlists/state/wishlist/wishlist.model';
import { WishlistQuery } from '@modules/wishlists/state/wishlist/wishlist.query';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'dw-wishlists-home',
  templateUrl: './wishlists-home.component.html',
  styleUrls: ['./wishlists-home.component.scss'],
})
export class WishlistsHomeComponent implements OnInit {
  public wishlists$: Observable<Wishlist[]>;
  private userId: string;

  constructor(private readonly auth: AuthQuery, private readonly query: WishlistQuery) {}

  public ngOnInit(): void {
    this.wishlists$ = this.query.selectAll();
    this.auth.profile$.pipe(tap(console.log), pluck('uid'), tap(console.log)).subscribe((uid: string) => (this.userId = uid));
  }
}
