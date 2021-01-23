import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportColumnsComponent } from './import-columns.component';

describe('ImportColumnsComponent', () => {
  let component: ImportColumnsComponent;
  let fixture: ComponentFixture<ImportColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
