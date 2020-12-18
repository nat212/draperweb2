import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetItem } from '@modules/budgets/state/budget-item/budget-item.model';
import { CategoryModel } from '@modules/budgets/state/category/category.model';
import { CategoryQuery } from '@modules/budgets/state/category/category.query';
import { CategoryService } from '@modules/budgets/state/category/category.service';
import { plainToClass } from 'class-transformer';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface BudgetItemDialogData {
  title: string;
  amount: number;
  category: CategoryModel;
}

@Component({
  selector: 'dw-budget-item-dialog',
  templateUrl: './budget-item-dialog.component.html',
  styleUrls: ['./budget-item-dialog.component.scss'],
})
export class BudgetItemDialogComponent implements OnInit, OnDestroy {
  public itemForm: FormGroup;
  public categories$: Observable<CategoryModel[]>;
  private destroyed$ = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly categoryQuery: CategoryQuery,
    @Inject(MAT_DIALOG_DATA) private readonly data: BudgetItemDialogData,
  ) {}

  public ngOnInit(): void {
    this.categoryService.syncQuery().pipe(takeUntil(this.destroyed$)).subscribe();
    this.itemForm = this.formBuilder.group({
      title: [this.data?.title ?? '', Validators.required],
      amount: [(this.data?.amount && Math.abs(this.data?.amount)) ?? null, Validators.required],
      type: [(this.data?.amount ?? 0) > 0 ? 'income' : 'expense', Validators.required],
      category: [this.data?.category?.id ?? null, Validators.required],
    });
    this.categories$ = this.categoryQuery.models$;
  }

  public get editing(): boolean {
    return !!this.data;
  }

  public get selectedCategory(): CategoryModel {
    const categoryId: string = this.itemForm.value.category;
    const category = categoryId && this.categoryQuery.getEntity(categoryId);
    return (category && plainToClass(CategoryModel, category)) ?? null;
  }

  public get value(): Partial<BudgetItem> {
    const { title, amount, type, category } = this.itemForm.value;
    return { title, amount: type === 'expense' ? -(amount ?? 0) : amount ?? 0, categoryId: category };
  }

  public ngOnDestroy() {
    this.destroyed$.next();
  }
}
