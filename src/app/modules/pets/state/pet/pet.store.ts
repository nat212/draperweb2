import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { PetData } from './pet.model';

export interface PetState extends CollectionState<PetData> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'pets', resettable: true })
export class PetStore extends EntityStore<PetState> {
  constructor() {
    super();
  }
}
