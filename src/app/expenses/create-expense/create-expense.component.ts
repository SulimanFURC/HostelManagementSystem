import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit {

  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      Fixed_Expense: ['electritybill1'],
      Expense_id: [''],
      other_expense: [''],
      tankerAmount_paid: [''],
      tankerAmount_due: [''],
      Expense_amount: [''],
      Payment_mode: ['cash'],
      Expense_date: [''],
      Expense_description: [''],
      Expense_pic: [''],
    });
   }

  ngOnInit(): void {
  }
  
  onSubmit() {
    const formData = this.form.value;
    const expense = this.form.get('FixedExpense')?.value;
    console.log('Selected Expense', expense);
    console.log('Complete Form Data', formData);
  }


}
