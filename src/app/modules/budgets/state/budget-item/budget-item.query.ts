import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { BudgetItemModel } from './budget-item.model';
import { BudgetItemState, BudgetItemStore } from './budget-item.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({ sortBy: 'order', sortByOrder: Order.ASC })
export class BudgetItemQuery extends QueryEntity<BudgetItemState> {
  public models$ = this.selectAll().pipe(map((items) => items.map((i) => plainToClass(BudgetItemModel, i))));
  public highestOrder$ = this.models$.pipe(
    map((models) => models.map((m) => m.order)),
    map((orders) => orders.sort((a, b) => b - a)),
    map((orders) => orders[0]),
  );
  constructor(protected store: BudgetItemStore) {
    super(store);
  }
}
