import { Type } from 'class-transformer';
import { Category, CategoryModel } from '../category/category.model';

export interface BudgetItem {
  id: string;
  title: string;
  amount: number;
  order: number;
  categoryId: string;
  category?: Category;
}

export class BudgetItemModel {
  public readonly id: string;
  public readonly title: string;
  public readonly amount: number;
  public readonly order: number;
  public readonly categoryId: string;
  @Type(() => CategoryModel) public readonly category: CategoryModel;
}
