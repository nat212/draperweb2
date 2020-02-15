import { Component, OnInit } from '@angular/core';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'dw-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  ngOnInit(): void {}
}
