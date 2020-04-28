import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '@dialogs/confirm/confirm.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private modal: NgbModal) {}

  async confirm(title: string, message: string): Promise<boolean> {
    const modalRef = this.modal.open(ConfirmComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    return modalRef.result.catch(() => false);
  }
}
