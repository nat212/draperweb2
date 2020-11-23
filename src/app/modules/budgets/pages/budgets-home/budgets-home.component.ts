import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewBudgetComponent } from '@modules/budgets/dialogs/new-budget/new-budget.component';
import { BudgetForms } from '@modules/budgets/forms';
import { Budget } from '@modules/budgets/state/budget/budget.model';
import { BudgetQuery } from '@modules/budgets/state/budget/budget.query';
import { BudgetService } from '@modules/budgets/state/budget/budget.service';
import { NgFormsManager } from '@ngneat/forms-manager';
import { AlertService } from '@services/alert.service';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dw-budgets-home',
  templateUrl: './budgets-home.component.html',
  styleUrls: ['./budgets-home.component.css'],
})
export class BudgetsHomeComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject<void>();
  public budgets$: Observable<Budget[]>;
  public years$: Observable<number[]>;
  public filterForm: FormGroup;

  constructor(
    private readonly budgetService: BudgetService,
    private readonly budgetQuery: BudgetQuery,
    private readonly formBuilder: FormBuilder,
    private readonly formManager: NgFormsManager<BudgetForms>,
    private readonly alert: AlertService,
    private readonly matDialog: MatDialog,
  ) {}

  public ngOnInit() {
    this.budgetService.syncCollection().pipe(takeUntil(this.destroyed$)).subscribe();
    this.years$ = this.budgetQuery.years$;
    this.budgets$ = this.budgetQuery.selectAll();
    this.filterForm = this.formBuilder.group({
      name: [''],
      years: [[]],
      undated: [true],
    });
    this.formManager.upsert('budgetFilter', this.filterForm, { persistState: true });
    this.formManager.valueChanges('budgetFilter', 'years').subscribe(console.log);
  }

  public ngOnDestroy() {
    this.destroyed$.next();
  }

  public addBudget() {
    this.alert
      .openDialog<{ startDate: Date; endDate: Date; name: string }>(this.matDialog, NewBudgetComponent)
      .pipe(filter((val) => !!val))
      .subscribe(({ startDate, endDate, name }) => {
        this.budgetService.add({ name, endDate: endDate && endDate.toISOString(), startDate: startDate && startDate.toISOString() });
      });
  }
}
