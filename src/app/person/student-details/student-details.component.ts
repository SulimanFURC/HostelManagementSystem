import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  activeFilter: string = 'all';

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }
  
  
  constructor(private router: Router) { }

  studentProfile() {
    this.router.navigate(['/Persons/Student-Profile']);
  }

  ngOnInit(): void {
  }

}
