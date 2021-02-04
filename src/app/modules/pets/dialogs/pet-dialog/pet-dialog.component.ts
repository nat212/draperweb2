import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pet } from '@modules/pets/state/pet/pet.model';
import { classToPlain } from 'class-transformer';

interface PetDialogData {
  pet?: Pet;
}

@Component({
  selector: 'dw-pet-dialog',
  templateUrl: './pet-dialog.component.html',
  styleUrls: ['./pet-dialog.component.scss'],
})
export class PetDialogComponent implements OnInit {
  petForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: PetDialogData, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      name: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      sex: ['', Validators.required],
      breed: ['', Validators.required],
      class: [''],
      dateOfAcquisition: [null],
      biography: [''],
    });
    if (this.data?.pet) {
      const petData = classToPlain(this.data.pet);
      this.petForm.patchValue({ ...petData });
    }
  }

  get editMode(): boolean {
    return !!this.data?.pet;
  }

  get petName(): string {
    return this.data?.pet?.name ?? '';
  }
}
