import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface WishlistItemData {
  name: string;
  amount?: number;
  link?: string;
  brand?: string;
}

@Component({
  selector: 'dw-wishlist-item-dialog',
  templateUrl: './wishlist-item-dialog.component.html',
  styleUrls: ['./wishlist-item-dialog.component.scss'],
})
export class WishlistItemDialogComponent implements OnInit {
  public wishlistItemForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: WishlistItemData) {}

  public ngOnInit(): void {
    this.wishlistItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [null],
      link: [''],
      brand: [''],
    });
    this.wishlistItemForm.patchValue(this.data || {});
  }

  public get editing(): boolean {
    return !!this.data;
  }
}
