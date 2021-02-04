import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dw-pets-home',
  templateUrl: './pets-home.component.html',
  styleUrls: ['./pets-home.component.scss']
})
export class PetsHomeComponent implements OnInit {

  links = [
    { label: 'Pets', path: 'pets' },
    { label: 'Vet Visits', path: 'vet' },
  ];

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  linkActive(link: { label: string, path: string }) {
    return this.route.firstChild.routeConfig.path === link.path;
  }

}
