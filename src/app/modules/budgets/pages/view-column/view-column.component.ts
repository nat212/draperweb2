import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BudgetItemDialogComponent, BudgetItemDialogData } from '@modules/budgets/dialogs/budget-item-dialog/budget-item-dialog.component';
import { BudgetItem, BudgetItemModel } from '@modules/budgets/state/budget-item/budget-item.model';
import { BudgetItemQuery } from '@modules/budgets/state/budget-item/budget-item.query';
import { BudgetItemService } from '@modules/budgets/state/budget-item/budget-item.service';
import { CategoryModel } from '@modules/budgets/state/category/category.model';
import { AlertService } from '@services/alert.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IconQuery } from 'src/app/state/icon/icon.query';

@Component({
  selector: 'dw-view-column',
  templateUrl: './view-column.component.html',
  styleUrls: ['./view-column.component.scss'],
})
export class ViewColumnComponent implements OnInit {
  private budgetId: string;
  private columnId: string;
  private highestOrder: number;
  public items$: Observable<BudgetItemModel[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: BudgetItemService,
    private readonly query: BudgetItemQuery,
    private readonly dialog: MatDialog,
    private readonly icon: IconQuery,
    private readonly alert: AlertService,
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe(({ budgetId, columnId }) => {
      this.budgetId = budgetId;
      this.columnId = columnId;
    });
    this.query.highestOrder$.subscribe((order) => (this.highestOrder = order ?? 0));
    this.items$ = this.query.models$;
  }

  public getIcon(category: CategoryModel) {
    return this.icon.getEntity(category.iconId)?.icon;
  }

  public addItem() {
    this.dialog
      .open(BudgetItemDialogComponent)
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe((value: Partial<BudgetItem>) => {
        this.service.add({ ...value, order: this.highestOrder + 1 }, { params: { budgetId: this.budgetId, columnId: this.columnId } });
      });
  }

  public editItem(item: BudgetItemModel) {
    const data: BudgetItemDialogData = { title: item.title, category: item.category, amount: item.amount };
    this.dialog
      .open(BudgetItemDialogComponent, { data })
      .afterClosed()
      .pipe(filter((value) => !!value))
      .subscribe((value: Partial<BudgetItem>) => {
        this.service.update({ ...value, id: item.id }, { params: { budgetId: this.budgetId, columnId: this.columnId } });
      });
  }

  public get summary$(): Observable<{ income: number; expenses: number; remaining: number }> {
    return this.items$.pipe(
      map((items) => items.map((i) => i.amount)),
      map((items) => ({
        income: items.filter((i) => i > 0).reduce((acc, curr) => acc + curr, 0),
        expenses: items
          .filter((i) => i < 0)
          .map((i) => Math.abs(i))
          .reduce((acc, curr) => acc + curr, 0),
      })),
      map(({ income, expenses }) => ({ income, expenses, remaining: income - expenses })),
    );
  }

  public deleteItem(item: BudgetItemModel) {
    this.alert
      .messageDialog('Delete Budget Item', `Are you sure you wish to delete ${item.title}? This operation cannot be undone.`, true)
      .pipe(filter((value) => !!value))
      .subscribe(() => {
        this.service.remove(item.id, { params: { budgetId: this.budgetId, columnId: this.columnId } });
      });
  }
}
