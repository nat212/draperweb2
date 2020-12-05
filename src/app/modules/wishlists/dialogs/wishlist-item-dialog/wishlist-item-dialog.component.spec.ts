import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistItemDialogComponent } from './wishlist-item-dialog.component';

describe('WishlistItemDialogComponent', () => {
  let component: WishlistItemDialogComponent;
  let fixture: ComponentFixture<WishlistItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistItemDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
