import { Component, OnInit } from '@angular/core';
import { NotificationService, NotificationData } from '../../Services/notification.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
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
