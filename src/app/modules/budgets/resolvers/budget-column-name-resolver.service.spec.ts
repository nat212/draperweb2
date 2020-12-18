import { TestBed } from '@angular/core/testing';

import { BudgetColumnNameResolverService } from './budget-column-name-resolver.service';

describe('BudgetColumnNameResolverService', () => {
  let service: BudgetColumnNameResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetColumnNameResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
