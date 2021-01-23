import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetColumn } from '@modules/budgets/state/budget-column/budget-column.model';
import { BudgetColumnQuery } from '@modules/budgets/state/budget-column/budget-column.query';
import { BudgetColumnService } from '@modules/budgets/state/budget-column/budget-column.service';
import { BudgetItem } from '@modules/budgets/state/budget-item/budget-item.model';
import { BudgetItemService } from '@modules/budgets/state/budget-item/budget-item.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import firebase from 'firebase/app';

@Component({
  templateUrl: './import-columns.component.html',
  styleUrls: ['./import-columns.component.scss'],
})
export class ImportColumnsComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  private columns: BudgetColumn[];
  private budgetId: string;

  columns$: Observable<BudgetColumn[]>;
  importForm: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: BudgetColumnService,
    private readonly query: BudgetColumnQuery,
    private readonly formBuilder: FormBuilder,
    private readonly itemService: BudgetItemService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap(({ budget }) => this.service.sync(budget)),
        takeUntil(this.destroyed$),
      )
      .subscribe();
    this.columns$ = combineLatest([this.route.queryParams.pipe(map(({ columns }) => columns as string[])), this.query.selectAll()]).pipe(
      map(([columnIds, columns]) => columns.filter((c) => columnIds.includes(c.id))),
    );

    this.route.params.subscribe(({ budgetId }) => {
      this.budgetId = budgetId;
    });

    this.columns$.subscribe((columns) => {
      this.columns = columns;
      this.buildForm(columns);
    });
  }

  private buildForm(columns: BudgetColumn[]) {
    this.importForm = this.formBuilder.group(Object.assign({}, ...columns.map((c) => ({ [c.id]: [c.items] }))));
  }

  submit() {
    this.service
      .runTransaction((txn) => Promise.all(this.columns.map((c) => this.addColumn(c, txn))))
      .then(() => this.router.navigate(['..'], { relativeTo: this.route }));
  }

  private addColumn(column: BudgetColumn, transaction: firebase.firestore.Transaction) {
    const budgetId = this.budgetId;
    const items = this.importForm.value[column.id].map((i: BudgetItem) => ({
      amount: i.amount,
      categoryId: i.categoryId,
      order: i.order,
      title: i.title,
    }));
    return this.service
      .add({ name: column.name }, { params: { budgetId }, write: transaction })
      .then((columnId) => this.itemService.add(items, { params: { budgetId, columnId }, write: transaction }));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
