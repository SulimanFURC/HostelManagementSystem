import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpenseService } from 'src/app/Services/expense.service';
import { MyModalComponent } from 'src/app/shared/my-modal/my-modal.component';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit {

  expenseForm: FormGroup;
  fileError: string | null = null;
  @Output() closeModal = new EventEmitter<void>();
  
  constructor(private fb: FormBuilder, private expenseSerice: ExpenseService) {
    this.expenseForm = this.fb.group({
      expDate: [],
      expName: [],
      expAmount: [],
      expPaymentMode: [],
      description: [],
      expAttachment: [],
    });
   }

  ngOnInit(): void {

  }
  
  onSubmit() {
    const formData = this.expenseForm.value;
    formData.expDate = this.formatDate(formData.expDate);
    this.expenseSerice.createExpense(formData).subscribe((res: any) => {
      console.log("Expense Created: ", res);
      this.expenseForm.reset();
      this.closeModal.emit();
    })
    console.log('Complete Form Data', formData);
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    const maxSize = 1 * 1024 * 1024; // 1MB
    if(file){
      if (file.size > maxSize) {
        this.fileError = 'File size exceeds 1MB. Please choose a smaller file.';
        event.target.value = '';  // Clear the input field
        return;
      }
      this.fileError = null;
      console.log("File: ", file)
      const reader = new FileReader()
      reader.onload = () => {
        this.expenseForm.patchValue({
          [controlName]: reader.result as string
        })
      }
      reader.readAsDataURL(file);
    }
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


}
