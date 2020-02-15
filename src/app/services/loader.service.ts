import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  text: string;
  enabled = false;

  constructor() {}

  show(text?: string) {
    this.text = text;
    this.enabled = true;
  }

  hide() {
    this.enabled = false;
    this.text = null;
  }
}
