import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsHomeComponent } from './budgets-home.component';

describe('BudgetsHomeComponent', () => {
  let component: BudgetsHomeComponent;
  let fixture: ComponentFixture<BudgetsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
