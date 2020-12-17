import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { CategoryModel } from './category.model';
import { CategoryState, CategoryStore } from './category.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({ sortBy: 'name', sortByOrder: Order.ASC })
export class CategoryQuery extends QueryEntity<CategoryState> {
  public models$ = this.selectAll().pipe(map((categories) => categories.map((c) => plainToClass(CategoryModel, c))));
  constructor(protected store: CategoryStore) {
    super(store);
  }
}
