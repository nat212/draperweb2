import { Component, OnInit, Input } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dw-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  icons = {
    'sign-out': faSignOutAlt,
  };

  constructor() {}

  @Input() icon: string;
}
