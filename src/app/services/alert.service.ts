import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent, MessageDialogData } from '../dialogs/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private readonly matDialog: MatDialog) {}

  public messageDialog(title: string, message: string) {
    const data: MessageDialogData = { title, message };
    return this.matDialog.open(MessageDialogComponent, { maxWidth: '280px', data }).afterClosed();
  }
}
