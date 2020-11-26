import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BudgetColumn } from '@modules/budgets/state/budget-column/budget-column.model';
import { BudgetColumnQuery } from '@modules/budgets/state/budget-column/budget-column.query';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'dw-view-budget',
  templateUrl: './view-budget.component.html',
  styleUrls: ['./view-budget.component.scss'],
})
export class ViewBudgetComponent implements OnInit {
  public columns$: Observable<BudgetColumn[]>;

  constructor(private columnQuery: BudgetColumnQuery, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.columns$ = this.route.params.pipe(switchMap(({ id }) => this.columnQuery.selectBudgetColumns(id)));
  }
}
