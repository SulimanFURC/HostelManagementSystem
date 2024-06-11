import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from 'src/app/Services/room.service';
import { MyModalComponent } from 'src/app/shared/my-modal/my-modal.component';

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
  @ViewChild(MyModalComponent) myModalComponent!: MyModalComponent;
  
  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }
  
  constructor(private roomService: RoomService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllRoomsDetails();
    this.createForm();
  }

  createForm() {
    this.createRoomForm = this.fb.group({
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

  onSubmit() {
    console.log("Form Values: ", this.createRoomForm.value);
    let formValues = this.createRoomForm.value;
    formValues.totalCapacity = parseInt(formValues.totalCapacity);
    if(this.createRoomForm.valid){
      this.roomService.createRoom(formValues).subscribe(res => {
        if(res.message === 'Room Created') {
          this.getAllRoomsDetails();
          this.myModalComponent.closeModal();
        }
      }, err => {
        console.log(err);
      })
    }
  }

}
