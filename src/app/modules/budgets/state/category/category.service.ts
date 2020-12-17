import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService, Query, syncQuery } from 'akita-ng-fire';
import { Category } from './category.model';
import { CategoryState, CategoryStore } from './category.store';

const categoryQuery: Query<Category> = {
  path: 'categories',
  icon: (category) => ({
    path: `icons/${category.iconId}`,
  }),
};

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'categories' })
export class CategoryService extends CollectionService<CategoryState> {
  constructor(protected store: CategoryStore) {
    super(store);
  }

  public syncQuery = syncQuery.bind(this, categoryQuery);
}
