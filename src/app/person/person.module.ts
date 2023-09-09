import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    StudentDetailsComponent,
    CreateStudentComponent,
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class PersonModule { }
