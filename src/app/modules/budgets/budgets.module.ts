import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BudgetsRoutingModule } from './budgets-routing.module';
import { NewBudgetComponent } from './dialogs/new-budget/new-budget.component';
import { BudgetsHomeComponent } from './pages/budgets-home/budgets-home.component';

@NgModule({
  declarations: [BudgetsHomeComponent, NewBudgetComponent],
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
  ],
  entryComponents: [NewBudgetComponent],
})
export class BudgetsModule {}
