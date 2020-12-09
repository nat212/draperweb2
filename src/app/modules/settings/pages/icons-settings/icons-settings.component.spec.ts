import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsSettingsComponent } from './icons-settings.component';

describe('IconsSettingsComponent', () => {
  let component: IconsSettingsComponent;
  let fixture: ComponentFixture<IconsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
