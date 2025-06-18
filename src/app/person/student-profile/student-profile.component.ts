import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { RentService } from 'src/app/Services/rent.service';
import { StatusServiceService } from 'src/app/Services/status-service.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  studentRecord: any;
  studentRentRecord: any;
  totalAmountPaid: number = 0;
  totalAmountDue: number = 0;
  monthNames: string[] = [
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
    'December'
  ];
  
  constructor(
    private statusService: NotificationService, 
    private route: ActivatedRoute,
    private rentService: RentService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const encodedData = params['data'];
      if (encodedData) {
          try {
              this.studentRecord = JSON.parse(atob(encodedData)); // Base64 decode the data
              console.log('Student Details:', this.studentRecord);
              this.getStudentRentalRecords();
             
          } catch (error) {
            this.statusService.showError('Error decoding student data:')
          }
      } else {
          this.statusService.showError('No data found in query params');
      }
    });
    // this.getStudentRentalRecords()
  }

  getStudentRentalRecords() {
    let payload = {
      "stdID": this.studentRecord?.stdID
    }
    this.rentService.stuentRentalRecord(payload).subscribe((res: any) => {
      this.studentRentRecord = res.data;
      // sum of all amount paid
      this.totalAmountPaid = this.studentRentRecord.reduce((sum: number, record: any) => {
        return sum + (Math.floor(record.AmountPaid) || 0);
      }, 0);

      // sum of all dues
      this.totalAmountDue = this.studentRentRecord.reduce((sum: number, record: any) => {
        return sum + (Math.floor(record.TotalDues) || 0);
      }, 0);
    }, (error: any) => {
      console.log("getStudentRentalRecords: ", error)
    })
  }

  // valueChange(value: any) {
  //   return Math.abs(value);
  // }
  
  getMonthName(monthNumber: number): string {
    return this.monthNames[monthNumber - 1];
  }
}
