import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminActivityLogsComponent } from './admin-activity-logs/admin-activity-logs.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AdminProfileComponent,
    AdminActivityLogsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class SettingsModule { }
