import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistsHomeComponent } from './wishlists-home.component';

describe('WishlistsHomeComponent', () => {
  let component: WishlistsHomeComponent;
  let fixture: ComponentFixture<WishlistsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
