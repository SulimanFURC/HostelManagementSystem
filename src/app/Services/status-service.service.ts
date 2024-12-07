import { Injectable } from '@angular/core';
import { StatusModalComponent } from '../shared/status-modal/status-modal.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {

  private statusModalComponent = new BehaviorSubject<StatusModalComponent | null>(null);
  private modalActionSubject = new BehaviorSubject<{isSuccess: boolean, message: string} | null>(null);
  
  statusModalComponent$ = this.statusModalComponent.asObservable();
  modalAction$ = this.modalActionSubject.asObservable();

  // Set modal component reference
  setModalComponent(modalComponent: StatusModalComponent) {
    this.statusModalComponent.next(modalComponent);
  }

  // Trigger modal actions
  showSuccess(message: string) {
    this.modalActionSubject.next({ isSuccess: true, message });
  }

  showError(message: string) {
    this.modalActionSubject.next({ isSuccess: false, message });
  }
}
