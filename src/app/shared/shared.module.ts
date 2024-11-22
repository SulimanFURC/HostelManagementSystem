import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyModalComponent } from './my-modal/my-modal.component';
import { StatusModalComponent } from './status-modal/status-modal.component';



@NgModule({
  declarations: [
    MyModalComponent,
    StatusModalComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [MyModalComponent, StatusModalComponent]
})
export class SharedModule { }
