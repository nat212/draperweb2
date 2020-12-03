import { Injectable } from '@angular/core';
import { CollectionConfig, FireAuthService } from 'akita-ng-fire';
import firebase from 'firebase/app';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users' })
export class AuthService extends FireAuthService<AuthState> {
  public createProfile(user: firebase.User): AuthState['profile'] {
    return { uid: user.uid, displayName: user.displayName, photoURL: user.photoURL };
  }
  constructor(store: AuthStore) {
    super(store);
  }
}
