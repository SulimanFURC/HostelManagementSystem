import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyModalComponent } from './my-modal/my-modal.component';
import { StatusModalComponent } from './status-modal/status-modal.component';
import { NumberFormatterPipe } from './Pipes/number-formatter.pipe';



@NgModule({
  declarations: [
    MyModalComponent,
    StatusModalComponent,
    NumberFormatterPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [MyModalComponent, StatusModalComponent, NumberFormatterPipe]
})
export class SharedModule { }
