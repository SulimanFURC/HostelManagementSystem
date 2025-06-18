import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StatusServiceService } from 'src/app/Services/status-service.service';
import { StudentService } from 'src/app/Services/student.service';
import { MyModalComponent } from 'src/app/shared/my-modal/my-modal.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  activeFilter: string = 'all';
  allStudent: any;
  @ViewChild('createStudentModal') createStudentModal!: MyModalComponent;


  constructor(private router: Router, private studentService: StudentService, private statusService: StatusServiceService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }


  getAllStudents() {
    this.studentService.getAllStudents().subscribe((res)=> {
      this.allStudent = res.data;
      console.log("Students Record: ", this.allStudent);
    })
  }

  deleteStudent(id: any) {
    let payload = {"stdID": id}
    this.studentService.deleteStudent(payload).subscribe((res: any) => {
      if(res){
        this.statusService.showWarning(res.message);
      }
      console.log("Student Deleted: ", res);
      this.getAllStudents();
    })
  }

  studentProfile(id:any) {
    let payload = {
      "studentId": id
    }
  this.studentService.getStudentById(payload).subscribe((res: any)=> {
    console.log("Student Record: ", res);
    const encodedData = btoa(JSON.stringify(res)); // Encode student data
    this.router.navigate(['/Persons/Student-Profile'], { queryParams: { data: encodedData } });
  })

  }

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }
  closeCreateStudentModal() {
    this.createStudentModal.closeModal()
    this.getAllStudents();
  }

}
