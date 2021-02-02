import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { PetDialogComponent } from './dialogs/pet-dialog/pet-dialog.component';
import { PetQuery } from './state/pet/pet.query';
import { PetService } from './state/pet/pet.service';

@Component({
  selector: 'dw-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  constructor(private readonly dialog: MatDialog, private readonly service: PetService, private readonly query: PetQuery) {}

  ngOnInit(): void {
    this.query.models$.subscribe(console.log);
  }

  addPet() {
    this.dialog
      .open(PetDialogComponent)
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe((pet) => {
        this.service.add({ ...pet, dateOfBirth: pet.dateOfBirth.toISOString(), dateOfAcquisition: pet.dateOfAcquisition.toISOString() });
      });
  }
}
