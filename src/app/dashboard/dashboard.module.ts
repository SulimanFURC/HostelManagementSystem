import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserComponent } from './user/user.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { SharedModule } from '../shared/shared.module';
Chart.register(...registerables);


@NgModule({
  declarations: [
    UserComponent,
    DashboardContentComponent,
    DashboardChartsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
