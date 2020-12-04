import { Component } from '@angular/core';

interface Link {
  icon: string;
  title: string;
  path: string;
}

@Component({
  selector: 'dw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public links: Link[] = [
    { icon: 'request_quote', title: 'Budgets', path: 'budgets' },
    { icon: 'card_giftcard', title: 'Wishlists', path: 'wishlists' },
  ];
}