import { Component, OnInit } from '@angular/core';
import { UpdateService } from '@services/update.service';

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
export class HomeComponent implements OnInit {
  public links: Link[] = [
    { icon: 'request_quote', title: 'Budgets', path: 'budgets' },
    { icon: 'card_giftcard', title: 'Wishlists', path: 'wishlists' },
  ];

  constructor(public update: UpdateService) {}

  public ngOnInit() {
    this.update.subscribe();
  }
}
