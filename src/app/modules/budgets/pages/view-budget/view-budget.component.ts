import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateColumnComponent } from '@modules/budgets/dialogs/create-column/create-column.component';
import { ImportColumnsDialogComponent } from '@modules/budgets/dialogs/import-columns-dialog/import-columns-dialog.component';
import { BudgetColumn } from '@modules/budgets/state/budget-column/budget-column.model';
import { BudgetColumnQuery } from '@modules/budgets/state/budget-column/budget-column.query';
import { BudgetColumnService } from '@modules/budgets/state/budget-column/budget-column.service';
import { Budget } from '@modules/budgets/state/budget/budget.model';
import { AlertService } from '@services/alert.service';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dw-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.scss'],
})
export class ViewBudgetComponent implements OnInit, OnDestroy {
  public columns$: Observable<BudgetColumn[]>;
  private budgetId: string;
  private destroyed$ = new Subject<void>();

  constructor(
    private readonly columnQuery: BudgetColumnQuery,
    private readonly route: ActivatedRoute,
    private readonly alert: AlertService,
    private readonly dialog: MatDialog,
    private readonly columnService: BudgetColumnService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.columns$ = this.columnQuery.selectAll();
    this.route.paramMap.subscribe((params) => (this.budgetId = params.get('budgetId')));
  }

  public ngOnDestroy() {
    this.destroyed$.next();
  }

  public importColumns() {
    this.dialog
      .open(ImportColumnsDialogComponent, { data: { budget: this.budgetId } })
      .afterClosed()
      .pipe(filter(val => !!val))
      .subscribe((val: { budget: Budget, columns: BudgetColumn[] }) => {
        const budget = val.budget.id;
        const columns = val.columns.map(c => c.id);
        this.router.navigate(['import'], { queryParams: { budget, columns }, relativeTo: this.route });
      });
  }

  public createColumn() {
    this.dialog
      .open(CreateColumnComponent)
      .afterClosed()
      .pipe(filter((val) => !!val))
      .subscribe((name) => {
        this.columnService.add({ name }, { params: { budgetId: this.budgetId } });
      });
  }

  public deleteColumn(column: BudgetColumn) {
    this.alert
      .messageDialog('Delete Column', `Are you sure you wish to delete ${column.name}? This operation cannot be undone.`, true)
      .subscribe((result) => {
        if (result) {
          this.columnService.remove(column.id, { params: { budgetId: this.budgetId } });
        }
      });
  }

  public columnSummary(column: BudgetColumn): { expenses: number; income: number; remaining: number } {
    const amounts = (column.items || []).map((i) => i.amount);
    const expenseItems = amounts.filter((a) => a < 0).map((a) => Math.abs(a));
    const incomeItems = amounts.filter((a) => a > 0);
    const expenses = expenseItems.reduce((acc, curr) => acc + curr, 0);
    const income = incomeItems.reduce((acc, curr) => acc + curr, 0);
    const remaining = income - expenses;
    return { expenses, income, remaining };
  }
}
