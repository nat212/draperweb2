import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PictureUploadComponent } from '@modules/shared/components/picture-upload/picture-upload.component';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PetDialogComponent } from './dialogs/pet-dialog/pet-dialog.component';
import { Pet } from './state/pet/pet.model';
import { PetQuery } from './state/pet/pet.query';
import { PetService } from './state/pet/pet.service';

@Component({
  selector: 'dw-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  pets$: Observable<Pet[]>;
  constructor(private readonly dialog: MatDialog, private readonly service: PetService, private readonly query: PetQuery) {}

  ngOnInit(): void {
    this.pets$ = this.query.models$;
  }

  addPet() {
    this.dialog
      .open(PetDialogComponent)
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe((pet) => {
        const val = { ...pet, dateOfBirth: pet.dateOfBirth.toISOString(), dateOfAcquisition: pet.dateOfAcquisition?.toISOString() };
        if (!val.dateOfAcquisition) {
          delete val.dateOfAcquisition;
        }
        this.service.add(val);
      });
  }

  uploadImage(pet: Pet) {
    this.dialog
      .open(PictureUploadComponent, { width: 'min(90vw, 360px)', maxHeight: '90vh', data: { filePath: `pets/${pet.id}/profile` } })
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe((photoURL) => {
        this.service.update(pet.id, { profilePicture: photoURL });
      });
  }

  editPet(pet: Pet) {
    this.dialog
      .open(PetDialogComponent)
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe((value) => {
        const val = { ...value, dateOfBirth: value.dateOfBirth.toISOString(), dateOfAcquisition: value.dateOfAcquisition?.toISOString() };
        if (!val.dateOfAcquisition) {
          delete val.dateOfAcquisition;
        }
        this.service.update(pet.id, val);
      });
  }
}
