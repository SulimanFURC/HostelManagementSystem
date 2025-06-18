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
      // If RentPaidMonth is a number, convert to date string for datepicker
      let rentPaidMonth = this.rentData.RentPaidMonth;
      let year = this.rentData.Year;
      let rentPaidMonthForForm = rentPaidMonth;
      if (typeof rentPaidMonth === 'number' && typeof year === 'number') {
        rentPaidMonthForForm = `${year}-${rentPaidMonth.toString().padStart(2, '0')}-01`;
      }
      this.rentForm.patchValue({
        stdID: this.rentData.stdID,
        RentPaidMonth: rentPaidMonthForForm,
        Year: this.rentData.Year,
        RentStatus: this.rentData.RentStatus,
        RentType: this.rentData.RentType,
        PaidAmount: this.rentData.PaidAmount
      });
      // Disable RentType and stdID in update mode
      this.rentForm.get('RentType')?.disable();
      this.rentForm.get('stdID')?.disable();
    } else {
      // Enable controls in create mode
      this.rentForm.get('RentType')?.enable();
      this.rentForm.get('stdID')?.enable();
    }
  }

  onSubmit(): void {
    const formData = this.rentForm.getRawValue(); // getRawValue to include disabled fields
    let payload: any = {
      rentID: this.rentData?.rentID,
      RentPaidMonth: this.rentData?.RentPaidMonth,
      Year: this.rentData?.Year,
      RentType: this.rentData?.RentType,
      PaidAmount: this.rentData?.PaidAmount
    };

    // If date changed, extract month/year
    if (formData.RentPaidMonth && typeof formData.RentPaidMonth === 'string' && formData.RentPaidMonth.includes('-')) {
      const selectedDate = new Date(formData.RentPaidMonth);
      payload.RentPaidMonth = selectedDate.getMonth() + 1;
      payload.Year = selectedDate.getFullYear();
    }
    // If PaidAmount changed
    if (formData.PaidAmount !== this.rentData?.PaidAmount) {
      payload.PaidAmount = formData.PaidAmount;
    }

    if (this.rentData && this.rentData.rentID) {
      // Update mode
      this.rentService.updateRentalRecord(payload).subscribe((res: any) => {
        this.rentForm.reset();
        this.formSuccess.emit();
        this.notificationService.showSuccess("Rent Updated Successfully", "Updated");
      });
    } else {
      // Create mode (original logic)
      let month = formData.RentPaidMonth;
      let year = formData.Year;
      if (typeof formData.RentPaidMonth === 'string' && formData.RentPaidMonth.includes('-')) {
        const selectedDate = new Date(formData.RentPaidMonth);
        month = selectedDate.getMonth() + 1;
        year = selectedDate.getFullYear();
      }
      const createPayload = { ...formData, RentPaidMonth: month, Year: year };
      this.rentForm.get('RentType')?.enable();
      this.rentForm.get('stdID')?.enable();
      this.rentService.createRentRecord(createPayload).subscribe((res: any) => {
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
