import { WishlistItem } from '@modules/wishlists/state/wishlist-item/wishlist-item.model';
import { Expose } from 'class-transformer';
import { BudgetItem } from '../budget-item/budget-item.model';

export interface BudgetColumn {
  id: string;
  name: string;
  budgetId: string;
  items?: BudgetItem[];
}

interface ColumnSummary {
  expenses: number;
  income: number;
  nett: number;
}

export class BudgetColumnModel {
  @Expose() public readonly id: string;
  @Expose() public readonly name: string;
  @Expose() public readonly items: BudgetItem[];

  public get columnSummary(): ColumnSummary {
    const expensesList = this.items.filter((i) => i.amount < 0);
    const incomeList = this.items.filter((i) => i.amount > 0);
    const expenses = expensesList.reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
    const income = incomeList.reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
    const nett = income - expenses;
    return { income, expenses, nett };
  }
}
