import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filterNil } from '@datorama/akita';
import { WishlistItemDialogComponent } from '@modules/wishlists/dialogs/wishlist-item-dialog/wishlist-item-dialog.component';
import { WishlistItem } from '@modules/wishlists/state/wishlist-item/wishlist-item.model';
import { WishlistItemQuery } from '@modules/wishlists/state/wishlist-item/wishlist-item.query';
import { WishlistItemService } from '@modules/wishlists/state/wishlist-item/wishlist-item.service';

@Component({
  selector: 'dw-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss'],
})
export class ViewWishlistComponent implements OnInit {
  constructor(
    private readonly query: WishlistItemQuery,
    private readonly dialog: MatDialog,
    private readonly service: WishlistItemService,
  ) {}

  public ngOnInit() {
    this.query.selectAll().subscribe(console.log);
  }

  public addWishlistItem() {
    this.dialog
      .open(WishlistItemDialogComponent)
      .afterClosed()
      .pipe(filterNil)
      .subscribe((value: Partial<WishlistItem>) => {
        this.service.add(value);
      });
  }
}
