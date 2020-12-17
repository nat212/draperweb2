import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'dw-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss'],
})
export class SettingsHomeComponent implements OnInit {
  public childActivated$: Observable<boolean>;
  constructor(private router: Router, private readonly route: ActivatedRoute) {}

  public ngOnInit() {
    this.childActivated$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => !!this.route.snapshot.firstChild),
      startWith(!!this.route.snapshot.firstChild),
    );
  }
}
