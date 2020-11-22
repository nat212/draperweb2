import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'dw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly titlePrefix = 'DraperWeb';

  constructor(private readonly title: Title, private readonly routerQuery: RouterQuery) {}

  public ngOnInit() {
    this.routerQuery
      .selectData()
      .pipe(
        filter((data) => !!data.title),
        map(({ title }) => title),
      )
      .subscribe((title: string) => this.title.setTitle(`${this.titlePrefix} | ${title}`));
  }
}
