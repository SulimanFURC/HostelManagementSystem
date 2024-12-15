import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/Services/expense.service';
import { MyModalComponent } from 'src/app/shared/my-modal/my-modal.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
  
  activeFilter: string = 'all';
  month_name: string = '';
  allExpenses: any;
  currentDues: any;
  currentPage: number = 1;
  pageSize: number = 4;
  totalRecords: number = 0;
  totalPages: number = 0;
  @ViewChild(MyModalComponent) myModalComponent!: MyModalComponent;

  constructor(private router: Router, private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.getAllExpenses(this.currentPage, this.pageSize);
  }

  handleModalClose() {
    this.myModalComponent.closeModal();
    this.getAllExpenses(this.currentPage, this.pageSize);
  }

  getMonthName(monthIndex: number): string {
    // Create an array of month names
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    // Return the month name based on the monthIndex
    return monthNames[monthIndex];
  }

  getAllExpenses(page: number, pageSize: number) {
    this.expenseService.getAllExpenses(page, pageSize).subscribe((res: any) => {
      this.allExpenses = res.data;
      this.totalRecords = res.totalRecords;
      this.totalPages = res.totalPages;
      this.currentPage = res.currentPage;
      console.log("Expenses: ", this.allExpenses)
    })
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.getAllExpenses(page, this.pageSize);
    }
  }

  onDateRangeChange(selectedDates: any): void {
    if (selectedDates && selectedDates.length === 2) {
      const startDate = selectedDates[0];
      this.month_name = this.getMonthName(startDate.getMonth());
    }
  }

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }

  studentProfile() {
    this.router.navigate(['/Persons/Student-Profile']);
  }

}
