import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LoaderService } from '@services/loader.service';
import { DialogService } from 'src/app/dialog.service';

@Component({
  selector: 'dw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  navbarItems = [
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Budgets', path: '/budgets' },
  ];

  menuCollapsed = true;

  constructor(
    private router: Router,
    private auth: AuthService,
    private loader: LoaderService,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {}

  get activePath() {
    return this.router.url;
  }
  logout() {
    this.dialog
      .confirm('Logout', 'Are you sure you wish to log out of DraperWeb?')
      .then(result => {
        if (result) {
          this.loader.show('Logging out...');
          this.auth
            .logout()
            .then(() => this.router.navigate(['/login']))
            .finally(() => this.loader.hide());
        }
      });
  }
}
