import { Component, Input, OnInit } from '@angular/core';
import { preventEventBubble } from '@helpers/prevent-bubble.helper';

interface Crumb {
  label: string;
  url: string;
}

@Component({
  selector: 'dw-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() public crumbs: Crumb[];
  constructor() {}

  public ngOnInit(): void {}

  public preventBubble(event: MouseEvent) {
    preventEventBubble(event);
  }
}
