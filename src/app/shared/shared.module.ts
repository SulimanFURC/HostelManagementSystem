import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyModalComponent } from './my-modal/my-modal.component';
import { StatusModalComponent } from './status-modal/status-modal.component';
import { NumberFormatterPipe } from './Pipes/number-formatter.pipe';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    MyModalComponent,
    StatusModalComponent,
    NumberFormatterPipe,
    NotificationComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [MyModalComponent, StatusModalComponent, NumberFormatterPipe, NotificationComponent]
})
export class SharedModule { }
