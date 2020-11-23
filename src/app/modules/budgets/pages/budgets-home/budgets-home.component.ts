import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
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
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dw-budgets-home',
  templateUrl: './budgets-home.component.html',
  styleUrls: ['./budgets-home.component.scss'],
})
export class BudgetsHomeComponent implements OnInit, OnDestroy {
  private readonly destroyed$ = new Subject<void>();
  public mobile$: Observable<boolean>;
  public budgets$: Observable<Budget[]>;
  public years$: Observable<(number | string)[]>;
  public filterForm: FormGroup;

  constructor(
    private readonly budgetService: BudgetService,
    private readonly budgetQuery: BudgetQuery,
    private readonly formBuilder: FormBuilder,
    private readonly formManager: NgFormsManager<BudgetForms>,
    private readonly alert: AlertService,
    private readonly matDialog: MatDialog,
    private readonly mediaObserver: MediaObserver,
  ) {}

  public ngOnInit() {
    this.budgetService.syncCollection().pipe(takeUntil(this.destroyed$)).subscribe();
    this.years$ = this.budgetQuery.years$;
    this.filterForm = this.formBuilder.group({
      name: [''],
      years: [[]],
    });
    this.formManager.upsert('budgetFilter', this.filterForm, { persistState: true });
    this.budgets$ = this.formManager
      .valueChanges('budgetFilter', 'years')
      .pipe(switchMap((years) => this.budgetQuery.filterByYears(years)));

    this.mobile$ = this.mediaObserver.asObservable().pipe(
      map((mediaChanges) => mediaChanges.map((m) => m.mqAlias)),
      map((mediaChanges) => mediaChanges.includes('xs')),
    );
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
