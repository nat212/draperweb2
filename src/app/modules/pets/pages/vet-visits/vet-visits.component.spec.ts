import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetVisitsComponent } from './vet-visits.component';

describe('VetVisitsComponent', () => {
  let component: VetVisitsComponent;
  let fixture: ComponentFixture<VetVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VetVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
