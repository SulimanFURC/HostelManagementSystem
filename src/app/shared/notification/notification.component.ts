import { Component, OnInit } from '@angular/core';
import { NotificationService, NotificationData } from '../../Services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: NotificationData[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe((notification) => {
      this.notifications.push(notification);
      setTimeout(() => this.removeNotification(notification), 5000);
    });
  }

  removeNotification(notification: NotificationData) {
    const idx = this.notifications.indexOf(notification);
    if (idx > -1) {
      this.notifications.splice(idx, 1);
    }
  }
}
