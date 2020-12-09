import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'dw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly titlePrefix = 'DraperWeb';

  constructor(private readonly title: Title, private readonly route: ActivatedRoute, private readonly router: Router) {}

  public ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.parseRouteTitle(this.route.root)),
        startWith(this.parseRouteTitle(this.route.root)),
      )
      .subscribe((title) => this.title.setTitle(`${this.titlePrefix} | ${title}`));
  }

  public parseRouteTitle(route: ActivatedRoute, title: string = ''): string {
    const newTitle = route.snapshot.data?.title ?? title;
    if (route.firstChild) {
      return this.parseRouteTitle(route.firstChild, newTitle);
    }
    return newTitle;
  }
}
