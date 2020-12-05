import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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

  private urlValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control?.value) {
        return null;
      } else {
        let url: URL;
        try {
          url = new URL(control.value);
        } catch (_) {
          return { url: true };
        }
        return url.protocol === 'http:' || url.protocol === 'https:' ? null : { url: true };
      }
    };
  }

  public ngOnInit(): void {
    this.wishlistItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [null, Validators.min(1)],
      link: ['', this.urlValidator()],
      brand: [''],
    });
    this.wishlistItemForm.patchValue(this.data || {});
  }

  public get editing(): boolean {
    return !!this.data;
  }
}
