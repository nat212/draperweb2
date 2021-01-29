import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { IconQuery } from 'src/app/state/icon/icon.query';
import { BudgetItem, BudgetItemModel } from './budget-item.model';
import { BudgetItemState, BudgetItemStore } from './budget-item.store';

@Injectable({ providedIn: 'root' })
@QueryConfig({ sortBy: 'order', sortByOrder: Order.ASC })
export class BudgetItemQuery extends QueryEntity<BudgetItemState> {
  public models$ = this.selectAll().pipe(
    map((items) => items.map((i) => this.buildItemWithIcon(i))),
    map((items) => items.map((i) => plainToClass(BudgetItemModel, i))),
  );
  public highestOrder$ = this.models$.pipe(
    map((models) => models.map((m) => m.order)),
    map((orders) => orders.sort((a, b) => b - a)),
    map((orders) => orders[0]),
  );
  constructor(protected store: BudgetItemStore, private iconQuery: IconQuery) {
    super(store);
  }

  private buildItemWithIcon(item: BudgetItem): BudgetItem {
    const category = item.category && { ...item.category, icon: this.iconQuery.getEntity(item.category.iconId) };
    return { ...item, category };
  }
}
