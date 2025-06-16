import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { StudentService } from 'src/app/Services/student.service';
import { RentService } from 'src/app/Services/rent.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.scss']
})
export class RentFormComponent implements OnInit, OnChanges {

  @Input() showForm?: boolean;
  @Input() rentData: any = null;
  @Output() formSuccess = new EventEmitter<void>();
  allStudents: any;
  rentForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private studentSerivce: StudentService,
    private rentService: RentService,
    private notificationService: NotificationService
  ) {

    this.rentForm = fb.group({
      stdID: [],
      RentPaidMonth: [],
      Year: [],
      RentStatus: ["Paid"],
      RentType: ["Cash"],
      PaidAmount: []
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rentData'] && this.rentData) {
      this.rentForm.patchValue({
        stdID: this.rentData.stdID,
        RentPaidMonth: this.rentData.RentPaidMonth,
        Year: this.rentData.Year,
        RentStatus: this.rentData.RentStatus,
        RentType: this.rentData.RentType,
        PaidAmount: this.rentData.PaidAmount
      });
    }
  }

  onSubmit(): void {
    const formData = this.rentForm.value;
    const selectedDate = new Date(formData.RentPaidMonth);
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    this.rentForm.patchValue({
      RentPaidMonth: month,
      Year: year,
    });
    if (this.rentData && this.rentData.rentID) {
      // Update mode
      const updatePayload = { ...this.rentForm.value, rentID: this.rentData.rentID };
      this.rentService.updateRentalRecord(updatePayload).subscribe((res: any) => {
        this.rentForm.reset();
        this.formSuccess.emit();
        this.notificationService.showSuccess("Rent Updated Successfully", "Updated");
      });
    } else {
      // Create mode
      this.rentService.createRentRecord(this.rentForm.value).subscribe((res: any) => {
        console.log("Rent Created: ", res);
        this.rentForm.reset();
        this.formSuccess.emit();
        this.notificationService.showSuccess("Rent Received Successfully", "Success");
      })
    }
  }

  ngOnInit(): void {
    // this.getCurrentDate();
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentSerivce.getAllStudents().subscribe((res: any) => {
      this.allStudents = res.data;
      // console.log("Students: ",this.allStudents)
    })
  }

  // getCurrentDate() {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   let month = (today.getMonth() + 1).toString();
  //   let day = today.getDate().toString();

  //   // Add leading zeros if necessary (e.g., 2023-09-05)
  //   if (month.length === 1) {
  //     month = '0' + month;
  //   }
  //   if (day.length === 1) {
  //     day = '0' + day;
  //   }

  //   return `${year}-${month}-${day}`;
  // }

}
