import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IconState, IconStore } from './icon.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'icons' })
export class IconService extends CollectionService<IconState> {
  public codepoints: string[] = [];
  public codepoints$ = new BehaviorSubject<string[]>([]);
  constructor(protected store: IconStore, private readonly http: HttpClient) {
    super(store);
    this.http.get(environment.mdiCodePointsURL, { responseType: 'text' }).subscribe((codepoints) => {
      this.codepoints = codepoints
        .split('\n')
        .filter((cp) => !!cp)
        .map((cp) => this.extractCodePointName(cp))
        .sort();
      this.codepoints$.next(this.codepoints);
    });
  }

  private extractCodePointName(cp: string) {
    return cp.split(' ')[0];
  }
}
