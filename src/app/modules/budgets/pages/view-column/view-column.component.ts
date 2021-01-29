import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BudgetItemDialogComponent, BudgetItemDialogData } from '@modules/budgets/dialogs/budget-item-dialog/budget-item-dialog.component';
import { BudgetItem, BudgetItemModel } from '@modules/budgets/state/budget-item/budget-item.model';
import { BudgetItemQuery } from '@modules/budgets/state/budget-item/budget-item.query';
import { BudgetItemService } from '@modules/budgets/state/budget-item/budget-item.service';
import { AlertService } from '@services/alert.service';
import { Map, Set } from 'immutable';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'dw-view-column',
  templateUrl: './view-column.component.html',
  styleUrls: ['./view-column.component.scss'],
})
export class ViewColumnComponent implements OnInit, AfterViewInit {
  private budgetId: string;
  private columnId: string;
  private highestOrder: number;
  public items$: Observable<BudgetItemModel[]>;
  public summary$: Observable<{ income: number; expenses: number; remaining: number }>;
  public categoryBreakdown$: Observable<{ name: string; value: number }[]>;
  public valueFormatter: (value: number) => string;
  public isMobile$: Observable<boolean>;

  public chartContainerWidth$ = new Subject<number>();
  public chartView$: Observable<number[]>;
  @ViewChild('chartsContainer') private chartsContainer: ElementRef<HTMLDivElement>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly service: BudgetItemService,
    private readonly query: BudgetItemQuery,
    private readonly dialog: MatDialog,
    private readonly alert: AlertService,
    private readonly currencyPipe: CurrencyPipe,
    private readonly mediaObserver: MediaObserver,
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe(({ budgetId, columnId }) => {
      this.budgetId = budgetId;
      this.columnId = columnId;
    });
    this.query.highestOrder$.subscribe((order) => (this.highestOrder = order ?? 0));
    this.items$ = this.query.models$;
    this.summary$ = this.items$.pipe(
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

    const getCategoryTotal = (items: BudgetItemModel[], categoryId: string, expense = true) =>
      items
        .filter((i) => i.categoryId === categoryId && (expense ? i.amount < 0 : i.amount > 0))
        .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

    this.categoryBreakdown$ = this.items$.pipe(
      map((items) =>
        [...Set(items.filter((i) => !!i.category).map((i) => Map({ ...i.category })))].map((cat) => ({
          name: cat.get('name'),
          value: getCategoryTotal(items, cat.get('id'), true),
        })),
      ),
    );
    this.valueFormatter = (value: number) => this.currencyPipe.transform(value, 'ZAR', 'symbol-narrow');

    this.isMobile$ = this.mediaObserver.asObservable().pipe(
      map((mediaChanges) => mediaChanges.map((mc) => mc.mqAlias)),
      map((mediaChanges) => mediaChanges.includes('lt-md')),
    );
    this.chartView$ = this.chartContainerWidth$.pipe(map((width) => [width, width]));
  }

  public ngAfterViewInit() {
    this.setChartsContainerWidth();
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

  public deleteItem(item: BudgetItemModel) {
    this.alert
      .messageDialog('Delete Budget Item', `Are you sure you wish to delete ${item.title}? This operation cannot be undone.`, true)
      .pipe(filter((value) => !!value))
      .subscribe(() => {
        this.service.remove(item.id, { params: { budgetId: this.budgetId, columnId: this.columnId } });
      });
  }

  public formatValue(value: number) {
    return this.currencyPipe.transform(value, 'ZAR', 'symbol-narrow');
  }

  private setChartsContainerWidth() {
    this.chartContainerWidth$.next(this.chartsContainer.nativeElement.offsetWidth);
  }

  @HostListener('window:resize')
  public onWindowResize() {
    this.setChartsContainerWidth();
  }

  public onDrop(event: CdkDragDrop<BudgetItemModel[]>) {
    const elements = event.container.data;
    const elementDragged = elements[event.previousIndex];
    const replacing = elements[event.currentIndex];
    moveItemInArray(elements, event.previousIndex, event.currentIndex);
    if (elementDragged.order > replacing.order) {
      this.service.moveItemHigher(elementDragged, replacing.order, elements, { budgetId: this.budgetId, columnId: this.columnId });
    } else if (elementDragged.order < replacing.order) {
      this.service.moveItemLower(elementDragged, replacing.order, elements, { budgetId: this.budgetId, columnId: this.columnId });
    }
  }
}
