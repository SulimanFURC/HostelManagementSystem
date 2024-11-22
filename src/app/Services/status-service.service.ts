import { Injectable } from '@angular/core';
import { StatusModalComponent } from '../shared/status-modal/status-modal.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {

  private statusModalComponent = new BehaviorSubject<StatusModalComponent | null>(null);
  statusModalComponent$ = this.statusModalComponent.asObservable();

  setModalComponent(modalComponent: StatusModalComponent) {
    this.statusModalComponent.next(modalComponent);
  }

  showSuccess(message: string) {
    this.statusModalComponent$.subscribe((component) => {
      component?.openModal(true, message);
    });
  }

  showError(message: string) {
    this.statusModalComponent$.subscribe((component) => {
      component?.openModal(false, message);
    });
  }
}
