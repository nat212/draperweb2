import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipFilterListComponent } from './chip-filter-list.component';

describe('ChipFilterListComponent', () => {
  let component: ChipFilterListComponent;
  let fixture: ComponentFixture<ChipFilterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipFilterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
