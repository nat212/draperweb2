import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

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

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  get activePath() {
    return this.router.url;
  }

  logout() {
    this.auth.logout().then(() => this.router.navigate(['/login']));
  }
}
