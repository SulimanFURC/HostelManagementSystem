import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusServiceService } from 'src/app/Services/status-service.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  activeFilter: string = 'all';
  allStudent: any;
  constructor(private router: Router, private studentService: StudentService, private statusService: StatusServiceService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }


  getAllStudents() {
    this.studentService.getAllStudents().subscribe((res)=> {
      this.allStudent = res;
      console.log("Students Record: ", this.allStudent);
    })
  }

  deleteStudent(id: any) {
    console.log("ID: ", id);
    let payload = {"stdID": id}
    debugger;
    this.studentService.deleteStudent(payload).subscribe((res: any) => {
      if(res){
        this.statusService.showError(res.message);
      }
      console.log("Student Deleted: ", res);
      this.getAllStudents();
    })
  }

  studentProfile() {
    this.router.navigate(['/Persons/Student-Profile']);
  }

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }

}
