import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

const routes: Routes = [
  {path: '', component: StudentDetailsComponent},
  {path: 'create-student', component: CreateStudentComponent},
  {path: 'Student-Profile', component: StudentProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
