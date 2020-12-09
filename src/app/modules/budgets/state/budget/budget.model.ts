import { BudgetColumn } from '../budget-column/budget-column.model';

export interface Budget {
  name: string;
  startDate: string;
  endDate: string;
  id: string;
  columns?: BudgetColumn[];
}
