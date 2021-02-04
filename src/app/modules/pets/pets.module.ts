import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PetDialogComponent } from './dialogs/pet-dialog/pet-dialog.component';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component';

@NgModule({
  declarations: [PetsComponent, PetDialogComponent],
  imports: [
    CommonModule,
    PetsRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    GridModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
  ],
})
export class PetsModule {}
