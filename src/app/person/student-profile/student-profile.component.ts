import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusServiceService } from 'src/app/Services/status-service.service';
import { StudentService } from 'src/app/Services/student.service';
import { StatusModalComponent } from 'src/app/shared/status-modal/status-modal.component';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  studentRecord: any;
  @ViewChild(StatusModalComponent) statusModalComponent!: StatusModalComponent;

  constructor(private statusService: StatusServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const encodedData = params['data'];
      if (encodedData) {
          try {
              this.studentRecord = JSON.parse(atob(encodedData)); // Base64 decode the data
              console.log('Student Details:', this.studentRecord);
             
          } catch (error) {
            this.statusService.showError('Error decoding student data:')
          }
      } else {
          console.log('No data found in query params');
      }
  });
  }

}
