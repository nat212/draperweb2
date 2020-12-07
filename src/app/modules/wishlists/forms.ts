export interface WishlistForms {
  itemsFilter: {
    search: string;
    amountFrom: number;
    amountTo: number;
    brands: string[];
  };
  wishlistsFilter: {
    search: string;
    users: string[];
    shared: boolean;
  };
}
