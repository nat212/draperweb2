import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';
import { CategoryService } from './category.service';
import { CategoryState } from './category.store';

@Injectable({ providedIn: 'root' })
export class CategoryGuard extends CollectionGuard<CategoryState> {
  constructor(protected service: CategoryService) {
    super(service);
  }

  public sync() {
    return this.service.syncQuery();
  }
}
