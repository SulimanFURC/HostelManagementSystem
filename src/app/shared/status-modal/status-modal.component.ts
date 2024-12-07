import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatusServiceService } from 'src/app/Services/status-service.service';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent implements OnInit {
  isSuccess: boolean = true;
  message: string = '';
  showModal: boolean = false;

  private modalActionSubscription: Subscription | null = null;

  constructor(private statusService: StatusServiceService) { }

  ngOnInit(): void {
    // Listen to modal actions from the service
    this.modalActionSubscription = this.statusService.modalAction$.subscribe(action => {
      if (action) {
        this.openModal(action.isSuccess, action.message);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    if (this.modalActionSubscription) {
      this.modalActionSubscription.unsubscribe();
    }
  }

  openModal(isSuccess: boolean, message: string) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
