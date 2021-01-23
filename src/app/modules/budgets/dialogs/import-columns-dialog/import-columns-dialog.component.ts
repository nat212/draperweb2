import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { BudgetColumn } from '@modules/budgets/state/budget-column/budget-column.model';
import { Budget } from '@modules/budgets/state/budget/budget.model';
import { BudgetQuery } from '@modules/budgets/state/budget/budget.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ImportColumnsDialogData {
  budget: string;
}

@Component({
  selector: 'dw-import-columns-dialog',
  templateUrl: './import-columns-dialog.component.html',
  styleUrls: ['./import-columns-dialog.component.scss'],
})
export class ImportColumnsDialogComponent implements OnInit {
  budgetForm: FormGroup;
  budgets$: Observable<Budget[]>;
  columns$: Observable<BudgetColumn[]>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly query: BudgetQuery,
    @Inject(MAT_DIALOG_DATA) private data: ImportColumnsDialogData,
  ) {}

  ngOnInit(): void {
    this.budgetForm = this.formBuilder.group({
      budget: [null, Validators.required],
      columns: [[], Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    this.budgets$ = this.query.selectAll().pipe(map((budgets) => budgets.filter((b) => b.id !== this.data.budget)));
    this.columns$ = this.budgetForm.get('budget').valueChanges.pipe(map((budget: Budget) => budget.columns || []));
  }
}
