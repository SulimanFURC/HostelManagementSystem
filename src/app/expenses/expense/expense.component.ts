import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
  
  activeFilter: string = 'all';
  month_name: string = '';
  constructor(private router: Router) { }


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


  ngOnInit(): void {
  }

}
