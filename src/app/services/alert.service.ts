import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MessageDialogComponent, MessageDialogData } from '../dialogs/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private readonly matDialog: MatDialog) {}

  public messageDialog(title: string, message: string, confirm = false): Observable<boolean> {
    const data: MessageDialogData = { title, message, confirm };
    return this.openDialog(this.matDialog, MessageDialogComponent, data);
  }

  public openDialog<T, U = any>(
    dialog: MatDialog,
    component: Type<any>,
    data: U = null,
    options: MatDialogConfig = { maxWidth: '320px' },
  ): Observable<T> {
    const config: MatDialogConfig = { ...options, data };
    return dialog.open(component, config).afterClosed();
  }
}
