export interface BudgetForms {
  budgetFilter: {
    name: string;
    years: (number | string)[];
    undated: boolean;
  };
}
