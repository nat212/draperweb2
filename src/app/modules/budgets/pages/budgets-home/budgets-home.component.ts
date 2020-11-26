import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NewBudgetComponent } from '@modules/budgets/dialogs/new-budget/new-budget.component';
import { BudgetForms } from '@modules/budgets/forms';
import { Budget } from '@modules/budgets/state/budget/budget.model';
import { BudgetQuery } from '@modules/budgets/state/budget/budget.query';
import { BudgetService } from '@modules/budgets/state/budget/budget.service';
import { NgFormsManager } from '@ngneat/forms-manager';
import { AlertService } from '@services/alert.service';
import Fuse from 'fuse.js';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';

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
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.budgetService.syncCollection().pipe(takeUntil(this.destroyed$)).subscribe();
    this.years$ = this.budgetQuery.years$;
    this.filterForm = this.formBuilder.group({
      name: [''],
      years: [[]],
    });
    this.formManager.upsert('budgetFilter', this.filterForm, { persistState: true });
    const filteredBudgets$ = this.formManager
      .valueChanges('budgetFilter', 'years')
      .pipe(switchMap((years) => this.budgetQuery.filterByYears(years)));

    const budgetFuse$ = filteredBudgets$.pipe(
      map((budgets) => {
        const opts: Fuse.IFuseOptions<Budget> = { keys: ['name', 'startDate', 'endDate'] };
        const index = Fuse.createIndex(opts.keys, budgets);
        return new Fuse(budgets, opts, index);
      }),
    );
    this.budgets$ = combineLatest([
      budgetFuse$,
      filteredBudgets$,
      this.formManager.valueChanges('budgetFilter', 'name').pipe(startWith(this.filterForm.value.name || ''), debounceTime(500)),
    ]).pipe(map(([budgetsFuse, budgets, searchTerm]) => (searchTerm ? budgetsFuse.search(searchTerm).map((i) => i.item) : budgets)));

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
