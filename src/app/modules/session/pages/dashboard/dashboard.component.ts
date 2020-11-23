import { Component } from '@angular/core';

interface Link {
  icon: string;
  title: string;
  path: string;
}

@Component({
  selector: 'dw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public links: Link[] = [
    { icon: 'request_quote', title: 'Budgets', path: 'budgets' },
    { icon: 'card_giftcard', title: 'Wishlists', path: 'wishlists' },
  ];
}
