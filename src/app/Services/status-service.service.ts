import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {
  constructor(private notificationService: NotificationService) {}

  showSuccess(message: string) {
    this.notificationService.showSuccess(message);
  }

  showError(message: string) {
    this.notificationService.showError(message);
  }

  showInfo(message: string) {
    this.notificationService,this.showInfo(message);
  }

  showWarning(message: string) {
    this.notificationService.showWarning(message);
  }
}
