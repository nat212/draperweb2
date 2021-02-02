import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';
import { PetService } from './pet.service';
import { PetState } from './pet.store';

@Injectable({ providedIn: 'root' })
export class PetGuard extends CollectionGuard<PetState> {
  constructor(protected service: PetService) {
    super(service);
  }
}
