import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.scss']
})
export class RentFormComponent implements OnInit {

  @Input() showForm?: boolean;
  
  students = ['Suliman', 'Samir', 'Haider']

  rentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rentForm = fb.group({
      student_name: [this.students[0]],
      payment_date: [''],
      payment_type: ['cash'],
      payment_status: ['unpaid'],
      payment_amount: [''],
      installment_1: [''],
      installment_2: [''],
    });
  }

  onSubmit(): void {
    const formData = this.rentForm.value;
    console.log('Form Data:', formData);
  }

  ngOnInit(): void {
    this.getCurrentDate();
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
