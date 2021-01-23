import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportColumnsDialogComponent } from './import-columns-dialog.component';

describe('ImportColumnsDialogComponent', () => {
  let component: ImportColumnsDialogComponent;
  let fixture: ComponentFixture<ImportColumnsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportColumnsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportColumnsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
