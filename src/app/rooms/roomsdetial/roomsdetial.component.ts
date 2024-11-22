import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from 'src/app/Services/room.service';
import { StatusServiceService } from 'src/app/Services/status-service.service';
import { MyModalComponent } from 'src/app/shared/my-modal/my-modal.component';
import { StatusModalComponent } from 'src/app/shared/status-modal/status-modal.component';

@Component({
  selector: 'app-roomsdetial',
  templateUrl: './roomsdetial.component.html',
  styleUrls: ['./roomsdetial.component.scss']
})
export class RoomsdetialComponent implements OnInit {
  roomDetails: any;
  activeFilter: string = 'all';
  createRoomForm!: FormGroup;
  validform: boolean = false;
  isEditMode: boolean = false;
  selectedRoomId: any;
  @ViewChild(MyModalComponent) myModalComponent!: MyModalComponent;
  @ViewChild('roomModal') roomModal!: MyModalComponent;
  @ViewChild(StatusModalComponent) statusModalComponent!: StatusModalComponent;

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }
  constructor(
    private roomService: RoomService, 
    private fb: FormBuilder, 
    private renderer: Renderer2,
    private statusService: StatusServiceService
  ) { }

  ngOnInit(): void {
    this.getAllRoomsDetails();
    this.createForm();
  }

  createForm() {
    this.createRoomForm  = this.fb.group({
      totalCapacity: [],
      attachBath: [""],
      description: [""]
    })
  }

  getAllRoomsDetails() {
    this.roomService.getAllRooms().subscribe(res => {
      this.roomDetails = res
      console.log("Room Details: ", this.roomDetails)
    }, err => {
      console.log(err);
    })
  }

  onSubmit(data: string) {
    console.log("Form Values: ", this.createRoomForm.value);
    let formValues = this.createRoomForm.value;
    formValues.totalCapacity = parseInt(formValues.totalCapacity);
    if(this.createRoomForm.valid && data === 'create') {
      console.log("Form Values: ", this.selectedRoomId)
      this.roomService.createRoom(formValues).subscribe(res => {
        if(res.message === 'Room Created') {
          this.getAllRoomsDetails();
          this.myModalComponent.closeModal();
        }
      }, err => {
        console.log(err);
      })
    } else if(this.createRoomForm.valid && data === 'update') {
      this.roomService.updateRoom(this.selectedRoomId, formValues).subscribe(res => {
        console.log("Room Update: ", res);
        this.roomModal.closeModal();
        this.getAllRoomsDetails();
      })
    }
  }

  editRoom(selectedData: any) {
    console.log("Selected Data: ", selectedData);
    this.isEditMode = true;
    this.roomModal.openModal();
    this.selectedRoomId = selectedData.roomID;
    this.createRoomForm.patchValue({
      totalCapacity: selectedData.totalCapacity,
      attachBath: selectedData.attachBath,
      description: selectedData.description
    });
  }

  deleteRoom(id: any) {
    this.roomService.deleteRoom(id).subscribe((res: any) => {
      console.log("Room Deleted: ", res);
      this.statusService.showSuccess('Room Deleted Successfully');
      this.getAllRoomsDetails();
    })
  }

}
