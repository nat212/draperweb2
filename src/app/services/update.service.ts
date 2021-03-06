import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  public updateAvailable$: Observable<boolean>;

  constructor(private swUpdate: SwUpdate, private readonly app: ApplicationRef) {
    this.updateAvailable$ = this.swUpdate.available.pipe(map((update) => !!update));
  }

  public subscribe() {
    if (environment.production) {
      const appIsStable$ = this.app.isStable.pipe(first((stable) => !!stable));
      const every30Minutes$ = interval(30 * 1000 * 60);
      const every30MinutesOnceAppIsStable$ = concat(appIsStable$, every30Minutes$);
      every30MinutesOnceAppIsStable$.subscribe(() => this.swUpdate.checkForUpdate());
    }
  }

  public activateUpdate() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
