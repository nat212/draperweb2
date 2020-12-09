import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { IconData } from './icon.model';

export interface IconState extends CollectionState<IconData> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'icons' })
export class IconStore extends EntityStore<IconState> {
  constructor() {
    super();
  }
}
