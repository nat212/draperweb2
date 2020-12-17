import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { BudgetItemModel } from './budget-item.model';
import { BudgetItemState, BudgetItemStore } from './budget-item.store';

@Injectable({ providedIn: 'root' })
export class BudgetItemQuery extends QueryEntity<BudgetItemState> {
  public models$ = this.selectAll().pipe(map((items) => items.map((i) => plainToClass(BudgetItemModel, i))));
  constructor(protected store: BudgetItemStore) {
    super(store);
  }
}
