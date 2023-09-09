import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  studentForm: FormGroup;
  maxCnicLength = 14;
  
  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      StudentFirstName: [''],
      StudentLastName: [''],
      FatherName: [''],
      StudentContactNo: [''],
      EmergencyContactNo: [''],
      BasicRent: [''],
      admission_date: [''],
      StudentCNICNo: [''],
      StudentAddress: [''],
      CNICFront: [''],
      CNICBack: [''],
      ProfilePic: [''],
    })

   }

   onSubmit() {
    const formData = this.studentForm.value;
    console.log(formData);
   }

  ngOnInit(): void {
    
  }



}
