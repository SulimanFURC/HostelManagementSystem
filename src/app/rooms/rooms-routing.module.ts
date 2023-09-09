import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomwrapperComponent } from './roomwrapper/roomwrapper.component';

const routes: Routes = [
  {
    path: '', component: RoomwrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
