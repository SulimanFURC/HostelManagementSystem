import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsdetialComponent } from './roomsdetial/roomsdetial.component';
import { RoomwrapperComponent } from './roomwrapper/roomwrapper.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoomsdetialComponent,
    RoomwrapperComponent,
    CreateRoomComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RoomsModule { }
