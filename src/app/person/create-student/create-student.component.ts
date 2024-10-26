import { StudentService } from './../../Services/student.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  studentForm!: FormGroup;
  maxCnicLength = 14;
  
  constructor(private fb: FormBuilder, private studentService: StudentService) {  }
  ngOnInit(): void {
    this.createStudentForm();
  }

  createStudentForm() {
    this.studentForm = this.fb.group({
      name: [''],
      cnic: [''],
      admissionDate: [''],
      basicRent: [''],
      contactNo: [''],
      bloodGroup: [''],
      address: [''],
      secondaryContactNo: [''],
      email: [''],
      picture: [''],
      cnic_front: [''],
      cnic_back: [''],
    })
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.studentForm.value.name);
    formData.append('cnic', this.studentForm.value.cnic);
    formData.append('admissionDate', (this.studentForm.value.admissionDate));
    formData.append('basicRent', this.studentForm.value.basicRent);
    formData.append('contactNo', this.studentForm.value.contactNo);
    formData.append('bloodGroup', this.studentForm.value.bloodGroup);
    formData.append('address', this.studentForm.value.address);
    formData.append('secondaryContactNo', this.studentForm.value.secondaryContactNo);
    formData.append('email', this.studentForm.value.email);
    formData.append('picture', this.studentForm.get('picture')?.value);
    formData.append('cnic_front', this.studentForm.get('cnic_front')?.value);
    formData.append('cnic_back', this.studentForm.get('cnic_back')?.value);

    this.studentService.createStudent(formData).subscribe((res) => {
      console.log("Student Create: ", res)
    })
  }

  



}
