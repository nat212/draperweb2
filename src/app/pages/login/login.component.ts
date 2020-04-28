import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'dw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private loader: LoaderService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loader.show('Logging in...');
    const { email, password } = this.loginForm.value;
    this.auth
      .login(email, password)
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((err) => {
        this.toast.show('Error logging in', err.message);
      })
      .finally(() => this.loader.hide());
  }
}
