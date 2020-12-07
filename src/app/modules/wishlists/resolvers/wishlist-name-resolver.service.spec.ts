import { TestBed } from '@angular/core/testing';

import { WishlistNameResolverService } from './wishlist-name-resolver.service';

describe('WishlistNameResolverService', () => {
  let service: WishlistNameResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistNameResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
