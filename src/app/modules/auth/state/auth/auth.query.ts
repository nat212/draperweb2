import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  public profile$ = this.select('profile');

  constructor(protected store: AuthStore) {
    super(store);
  }
}
