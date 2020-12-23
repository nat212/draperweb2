import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@modules/shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BudgetsRoutingModule } from './budgets-routing.module';
import { BudgetItemDialogComponent } from './dialogs/budget-item-dialog/budget-item-dialog.component';
import { CreateColumnComponent } from './dialogs/create-column/create-column.component';
import { NewBudgetComponent } from './dialogs/new-budget/new-budget.component';
import { BudgetsHomeComponent } from './pages/budgets-home/budgets-home.component';
import { ViewBudgetComponent } from './pages/view-budget/view-budget.component';
import { ViewColumnComponent } from './pages/view-column/view-column.component';

@NgModule({
  declarations: [
    BudgetsHomeComponent,
    NewBudgetComponent,
    ViewBudgetComponent,
    CreateColumnComponent,
    ViewColumnComponent,
    BudgetItemDialogComponent,
  ],
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
    MatMenuModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatSelectModule,
    NgxChartsModule,
  ],
  providers: [CurrencyPipe],
  entryComponents: [NewBudgetComponent],
})
export class BudgetsModule {}
