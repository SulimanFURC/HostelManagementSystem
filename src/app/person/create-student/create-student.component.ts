import { StudentService } from './../../Services/student.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/Services/notification.service';
import { RoomService } from 'src/app/Services/room.service';
import { StatusServiceService } from 'src/app/Services/status-service.service';
import { MyModalComponent } from 'src/app/shared/my-modal/my-modal.component';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  studentForm!: FormGroup;
  maxCnicLength = 14;
  fileError: string | null = null;
  allStudent: any;
  @Output() studentCreated = new EventEmitter<void>();
  @ViewChild(MyModalComponent) myModalComponent!: MyModalComponent;
  allRooms: any;

  constructor(
    private fb: FormBuilder, 
    private studentService: StudentService, 
    private statusService: StatusServiceService,
    private roomSerivice: RoomService,
    private notificationService: NotificationService
  ) {  }

  ngOnInit(): void {
    this.createStudentForm();
    this.getAllRooms();
  }

  getAllRooms() {
    this.roomSerivice.getAllRooms().subscribe((res) => {
      this.allRooms = res;
      console.log("All Rooms: ", this.allRooms);
    })
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe((res)=> {
      this.allStudent = res;
      console.log("Students Record: ", this.allStudent);
    })
  }

  createStudentForm() {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      cnic: ['', Validators.required],
      admissionDate: ['', Validators.required],
      basicRent: ['', Validators.required],
      contactNo: ['', Validators.required],
      bloodGroup: [''],
      address: [''],
      secondaryContactNo: ['', Validators.required],
      email: ['', Validators.required],
      picture: [''],
      cnic_front: [''],
      cnic_back: [''],
      roomNumber: ['', Validators.required],
      securityFee: [''],
      description: [''],
    })
  }

  onSubmit() {
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
      this.notificationService.showWarning("Please fill all required fields.");
      return;
    }
    const formData = {...this.studentForm.value}
    formData.admissionDate = this.formatDate(formData.admissionDate);
    formData.roomNumber = parseInt(formData.roomNumber);
    console.log("Student Form Data: ", formData);
    this.studentService.createStudent(formData).subscribe((res) => {
      if(res.status){
        this.studentForm.reset();
        this.studentForm.controls['picture'].setValue('');
        this.studentForm.controls['cnic_front'].setValue('');
        this.studentForm.controls['cnic_back'].setValue('');
        this.getAllStudents();
        this.notificationService.showSuccess("Student created successfully.");
        this.studentCreated.emit(); // Emit event to notify parent component
      } else {
        this.notificationService.showError("Failed to create student.");
      }
    }, (error: any) => {
      console.log("Error: ", error);
    })
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if(file){
      if (file.size > maxSize) {
        this.fileError = 'File size exceeds 5MB. Please choose a smaller file.';
        event.target.value = '';  // Clear the input field
        return;
      }
      this.fileError = null;
      console.log("File: ", file)
      const reader = new FileReader()
      reader.onload = () => {
        this.studentForm.patchValue({
          [controlName]: reader.result as string
        })
      }
      reader.readAsDataURL(file);
    }
  }

  // Format date to "YYYY-MM-DD HH:mm:ss"
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
