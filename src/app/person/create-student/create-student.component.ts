import { StudentService } from './../../Services/student.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private roomSerivice: RoomService
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
      name: [''],
      cnic: [''],
      admissionDate: [''],
      basicRent: [''],
      contactNo: [''],
      bloodGroup: [''],
      address: [''],
      secondaryContactNo: [''],
      email: [''],
      picture: [''],
      cnic_front: [''],
      cnic_back: [''],
      roomNumber: [''],
      securityFee: [''],
      description: [''],
    })
  }

  onSubmit() {
    if(this.studentForm.invalid){
      alert("Please fill the required fields...");
    }
    const formData = {...this.studentForm.value}
    formData.admissionDate = this.formatDate(formData.admissionDate);
    formData.roomNumber = parseInt(formData.roomNumber);
    console.log("Student Form Data: ", formData);
    debugger;
    this.studentService.createStudent(formData).subscribe((res) => {
      console.log("Student Create: ", res)
      if(res.status){
        this.studentForm.reset();
        this.studentForm.controls['picture'].setValue('');
        this.studentForm.controls['cnic_front'].setValue('');
        this.studentForm.controls['cnic_back'].setValue('');
        this.getAllStudents();
        this.myModalComponent.closeModal();
        this.statusService.showSuccess(res.message)
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
