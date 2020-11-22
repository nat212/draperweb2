import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface MessageDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'dw-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
})
export class MessageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: MessageDialogData) {}
}
