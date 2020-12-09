import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';
import { IconService } from './icon.service';
import { IconState } from './icon.store';

@Injectable({ providedIn: 'root' })
export class IconGuard extends CollectionGuard<IconState> {
  constructor(protected service: IconService) {
    super(service);
  }
}
