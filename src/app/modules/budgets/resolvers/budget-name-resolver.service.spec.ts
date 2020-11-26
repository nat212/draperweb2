import { TestBed } from '@angular/core/testing';

import { BudgetNameService } from './budget-name.service';

describe('BudgetNameService', () => {
  let service: BudgetNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
