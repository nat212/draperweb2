import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { CategorySettingsComponent } from './pages/category-settings/category-settings.component';
import { IconsSettingsComponent } from './pages/icons-settings/icons-settings.component';
import { SettingsHomeComponent } from './pages/settings-home/settings-home.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [SettingsHomeComponent, IconsSettingsComponent, CategorySettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    GridModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatSelectModule,
  ],
})
export class SettingsModule {}
