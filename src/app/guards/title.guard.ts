import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  CanActivateChild,
} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleGuard implements CanActivate, CanActivateChild {
  private baseTitle = 'DraperWeb';

  constructor(private title: Title) {}
  canActivate(next: ActivatedRouteSnapshot) {
    const title = next.data.title;
    if (title) {
      this.title.setTitle(`${this.baseTitle} | ${title}`);
    }
    return true;
  }

  canActivateChild(next: ActivatedRouteSnapshot) {
    return this.canActivate(next);
  }
}
