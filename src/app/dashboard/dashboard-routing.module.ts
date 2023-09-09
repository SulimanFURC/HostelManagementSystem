import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';

const routes: Routes = [
  {
    path: '', component: DashboardContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
