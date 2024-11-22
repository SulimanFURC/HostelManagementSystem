import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent implements OnInit {

  isSuccess: boolean = true;
  message: string = '';
  showModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openModal(isSuccess: boolean, message: string) {
    debugger;
    this.isSuccess = isSuccess;
    this.message = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
