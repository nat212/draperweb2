import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthForms } from '@modules/auth/forms';
import { NgFormsManager } from '@ngneat/forms-manager';
import { AlertService } from '@services/alert.service';
import { AuthService } from '../../state/auth/auth.service';

interface FirebaseAuthError {
  code: string;
  message: string;
}

@Component({
  selector: 'dw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  constructor(
    private readonly alert: AlertService,
    private readonly formBuilder: FormBuilder,
    private readonly auth: AuthService,
    private readonly formsManager: NgFormsManager<AuthForms>,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
    this.formsManager.upsert('login', this.loginForm);
  }

  public ngOnDestroy() {
    this.formsManager.unsubscribe('login');
  }

  public submit() {
    const { email, password } = this.loginForm.value;
    this.auth
      .signin(email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: FirebaseAuthError) => {
        this.alert.messageDialog('Login Error', err.message);
      });
  }
}
