import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { RentService } from 'src/app/Services/rent.service';
import { MyModalComponent } from 'src/app/shared/my-modal/my-modal.component';

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.scss']
})
export class RentDetailsComponent implements OnInit {

  rentInfo: any;
  activeFilter: string = 'all';
  currentDues: any;
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  totalPages: number = 0;
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
  selectedRent: any = null;
  @ViewChild('rentModal') rentModal!: MyModalComponent;

  constructor(
    private rentService: RentService, 
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllRents(this.currentPage, this.pageSize);
  }

  getAllRents(page: number, pageSize: number) {
    this.rentService.getAllRentRecords(page, pageSize).subscribe((res: any) => {
      this.rentInfo = res.data;
      this.totalRecords = res.totalRecords;
      this.totalPages = res.totalPages;
      this.currentPage = res.currentPage;
    }, (error: any) => {
      console.log("Get All Rent Error: ", error)
    })
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.getAllRents(page, this.pageSize);
    }
  }

  deleteRent(id: any) {
    console.log("Selected Rent ID: ", id);
    let payload = {
      "rentID": id
   }
    this.rentService.deleteRentRecord(payload).subscribe((res: any) => {
      console.log("Rent Deleted: ", res);
      this.notificationService.showWarning("Rent Deleted Successfully", "Deleted");
      this.getAllRents(this.currentPage, this.pageSize);
    })
  }

  updateRent(item: any) {
    this.selectedRent = {...item, rentID: item.RentID};
    setTimeout(() => {
      this.rentModal.openModal();
    });
  }

  navigateToInvoice() {
    this.router.navigate(['Rent/invoice']);
  }
  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }

  getMonthName(monthNumber: number): string {
    return this.monthNames[monthNumber - 1];
  }

}
