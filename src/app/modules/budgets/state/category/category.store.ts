import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { Category } from './category.model';

export interface CategoryState extends CollectionState<Category> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'categories', resettable: true })
export class CategoryStore extends EntityStore<CategoryState> {
  constructor() {
    super();
  }
}
