import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationData {
  type: NotificationType;
  title: string;
  message: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationSubject = new Subject<NotificationData>();
  notification$ = this.notificationSubject.asObservable();

  private notificationData = {
    info: {
      title: 'Information',
      message: 'A new update is available for your application.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    },
    success: {
      title: 'Success!',
      message: 'Your action has been completed successfully.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    },
    warning: {
      title: 'Warning',
      message: 'Please check your input information.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
    },
    error: {
      title: 'Error',
      message: 'An error has occurred. Please try again.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
    }
  };

  show(type: NotificationType, message?: string, title?: string) {
    const data = this.notificationData[type];
    this.notificationSubject.next({
      type,
      title: title || data.title,
      message: message || data.message,
      icon: data.icon
    });
  }

  showSuccess(message?: string, title?: string) {
    this.show('success', message, title);
  }
  showError(message?: string, title?: string) {
    this.show('error', message, title);
  }
  showInfo(message?: string, title?: string) {
    this.show('info', message, title);
  }
  showWarning(message?: string, title?: string) {
    this.show('warning', message, title);
  }
}
