import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BudgetItemDialogComponent, BudgetItemDialogData } from '@modules/budgets/dialogs/budget-item-dialog/budget-item-dialog.component';
import { BudgetItem, BudgetItemModel } from '@modules/budgets/state/budget-item/budget-item.model';
import { BudgetItemQuery } from '@modules/budgets/state/budget-item/budget-item.query';
import { BudgetItemService } from '@modules/budgets/state/budget-item/budget-item.service';
import { CategoryModel } from '@modules/budgets/state/category/category.model';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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
}
