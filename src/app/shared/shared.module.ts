import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyModalComponent } from './my-modal/my-modal.component';
import { NumberFormatterPipe } from './Pipes/number-formatter.pipe';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    MyModalComponent,
    NumberFormatterPipe,
    NotificationComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [MyModalComponent,  NumberFormatterPipe, NotificationComponent]
})
export class SharedModule { }
