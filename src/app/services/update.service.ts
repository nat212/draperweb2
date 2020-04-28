import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastService } from './toast.service';
import { LoaderService } from './loader.service';
import { interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(
    private update: SwUpdate,
    private toast: ToastService,
    appRef: ApplicationRef
  ) {
    if (update.isEnabled) {
      const appIsStable$ = appRef.isStable.pipe(
        first((stable) => stable === true)
      );
      const every30Seconds$ = interval(30 * 1000);
      concat(appIsStable$, every30Seconds$).subscribe(() =>
        update.checkForUpdate()
      );
    }
  }

  subscribe() {
    this.update.available.subscribe(() => {
      this.toast.show(
        'Update Available',
        'There is an update available. Please reload the page to activate.'
      );
    });
  }
}
