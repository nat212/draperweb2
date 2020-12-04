import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface NewWishlistData {
  name?: string;
  shared?: boolean;
}

@Component({
  selector: 'dw-new-wishlist',
  templateUrl: './new-wishlist.component.html',
  styleUrls: ['./new-wishlist.component.scss'],
})
export class NewWishlistComponent implements OnInit {
  public wishlistForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: NewWishlistData) {}

  public get editing(): boolean {
    return !!this.data?.name;
  }

  public ngOnInit() {
    this.wishlistForm = this.formBuilder.group({
      name: ['', Validators.required],
      shared: [false],
    });
    this.wishlistForm.patchValue(this.data || {});
  }
}
