import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { PetState, PetStore } from './pet.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'pets' })
export class PetService extends CollectionService<PetState> {
  constructor(store: PetStore) {
    super(store);
  }
}
