import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetItemDialogComponent } from './budget-item-dialog.component';

describe('BudgetItemDialogComponent', () => {
  let component: BudgetItemDialogComponent;
  let fixture: ComponentFixture<BudgetItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetItemDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
