import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from 'src/app/Services/student.service';
import { RentService } from 'src/app/Services/rent.service';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.scss']
})
export class RentFormComponent implements OnInit {

  @Input() showForm?: boolean;
  
  allStudents: any;
  rentForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private studentSerivce: StudentService,
    private rentService: RentService
  ) {

    this.rentForm = fb.group({
      stdID: [],
      RentPaidMonth: [],
      Year: [],
      RentStatus: ["Paid"],
      RentType: ["Cash"],
      PaidAmount: []
    });
  }

  onSubmit(): void {
    const formData = this.rentForm.value;
    const selectedDate = new Date(formData.RentPaidMonth);
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    this.rentForm.patchValue({
      RentPaidMonth: month,
      Year: year,
    })
    console.log('Form Data:', this.rentForm.value);
    this.rentService.createRentRecord(this.rentForm.value).subscribe((res: any) => {
      console.log("Rent Created: ", res);
      this.rentForm.reset();
    })
  }

  ngOnInit(): void {
    this.getCurrentDate();
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentSerivce.getAllStudents().subscribe((res: any) => {
      this.allStudents = res.data;
      // console.log("Students: ",this.allStudents)
    })
  }

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();

    // Add leading zeros if necessary (e.g., 2023-09-05)
    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

}
