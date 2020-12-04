import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';
import { AuthService } from './auth.service';
import { AuthState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard extends CollectionGuard<AuthState> {
  constructor(service: AuthService) {
    super(service);
  }
}
