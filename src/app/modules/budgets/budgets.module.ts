import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '@modules/shared/shared.module';
import { BudgetsRoutingModule } from './budgets-routing.module';
import { NewBudgetComponent } from './dialogs/new-budget/new-budget.component';
import { BudgetsHomeComponent } from './pages/budgets-home/budgets-home.component';
import { ViewBudgetComponent } from './pages/view-budget/view-budget.component';
import { CreateColumnComponent } from './dialogs/create-column/create-column.component';

@NgModule({
  declarations: [BudgetsHomeComponent, NewBudgetComponent, ViewBudgetComponent, CreateColumnComponent],
  imports: [
    CommonModule,
    BudgetsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatChipsModule,
    SharedModule,
    MatListModule,
    MatExpansionModule,
  ],
  entryComponents: [NewBudgetComponent],
})
export class BudgetsModule {}