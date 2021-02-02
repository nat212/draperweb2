import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDialogComponent } from './pet-dialog.component';

describe('PetDialogComponent', () => {
  let component: PetDialogComponent;
  let fixture: ComponentFixture<PetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
