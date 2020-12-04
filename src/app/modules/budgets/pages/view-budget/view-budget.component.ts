import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateColumnComponent } from '@modules/budgets/dialogs/create-column/create-column.component';
import { BudgetColumn } from '@modules/budgets/state/budget-column/budget-column.model';
import { BudgetColumnQuery } from '@modules/budgets/state/budget-column/budget-column.query';
import { BudgetColumnService } from '@modules/budgets/state/budget-column/budget-column.service';
import { BudgetQuery } from '@modules/budgets/state/budget/budget.query';
import { BudgetService } from '@modules/budgets/state/budget/budget.service';
import { AlertService } from '@services/alert.service';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';

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
    private readonly budgetQuery: BudgetQuery,
    private columnQuery: BudgetColumnQuery,
    private route: ActivatedRoute,
    private readonly alert: AlertService,
    private readonly dialog: MatDialog,
    private columnService: BudgetColumnService,
    private readonly budgetService: BudgetService,
  ) {}

  public ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({ id }) => this.budgetService.syncActive({ id })),
        takeUntil(this.destroyed$),
      )
      .subscribe();
    this.budgetQuery
      .selectActive()
      .pipe(
        filter((budget) => !!budget),
        switchMap((budget) => this.columnService.syncCollection({ params: { budgetId: budget.id } })),
        takeUntil(this.destroyed$),
      )
      .subscribe();
    this.columns$ = this.columnQuery.selectAll();
    this.route.paramMap.subscribe((params) => (this.budgetId = params.get('id')));
  }

  public ngOnDestroy() {
    this.destroyed$.next();
  }

  public createColumn() {
    this.alert
      .openDialog<string>(this.dialog, CreateColumnComponent)
      .pipe(filter((val) => !!val))
      .subscribe((name) => {
        this.columnService.add({ name }, { params: { budgetId: this.budgetId } });
      });
  }
}
