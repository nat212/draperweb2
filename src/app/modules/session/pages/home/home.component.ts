import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UpdateService } from '@services/update.service';
import { interval, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first } from 'rxjs/operators';

interface Link {
  icon: string;
  title: string;
  path: string;
}

interface Crumb {
  label: string;
  url: string;
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

  public breadcrumbs$ = new Subject<Crumb[]>();

  constructor(public update: UpdateService, private readonly route: ActivatedRoute, private readonly router: Router) {}

  public ngOnInit() {
    this.update.subscribe();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.breadcrumbs$.next(this.buildBreadCrumb(this.route.root));
      });
    interval(500)
      .pipe(first())
      .subscribe(() => this.breadcrumbs$.next(this.buildBreadCrumb(this.route.root)));
  }

  private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Crumb[] = []): Crumb[] {
    const label: string = route.snapshot.data?.breadcrumb ?? '';
    let path: string = route.routeConfig?.path ?? '';
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
    }
    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumb: Crumb = {
      label,
      url: nextUrl,
    };
    const newBreadcrumbs =
      breadcrumb.label && breadcrumb.url !== breadcrumbs[breadcrumbs.length - 1]?.url ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
