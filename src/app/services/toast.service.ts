import { Injectable } from '@angular/core';

interface Toast {
  delay: number;
  header: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: Toast[] = [];

  constructor() {}

  show(header: string, body: string, delay = 5000) {
    this.toasts.push({ header, body, delay });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
