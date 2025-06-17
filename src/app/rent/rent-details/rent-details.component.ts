import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';
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
  activeFilter: string = '';
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
  searchControl = new FormControl('');
  
  constructor(
    private rentService: RentService, 
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllRents(this.currentPage, this.pageSize);

    // handling search input 
    this.searchControl.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((searchTerm: any) => {
      this.getAllRents(1, this.pageSize, searchTerm, this.activeFilter);
    })
  }

  getAllRents(page: number, pageSize: number, search: string = '', rentStatus: string = '') {
    this.rentService.getAllRentRecords(page, pageSize, search, rentStatus).subscribe((res: any) => {
      this.rentInfo = res.data;
      this.totalRecords = res.totalRecords;
      this.totalPages = res.totalPages;
      this.currentPage = res.currentPage;
    }, (error: any) => {
      console.log("Get All Rent Error: ", error)
    })
  }

  searchTimeout: any;

  onSearchChange(event: any) {
    const searchTerm = event.target.value;
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.getAllRents(1, this.pageSize, searchTerm, this.activeFilter);
    }, 1500);
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
    if (filter === 'Clear') {
      this.activeFilter = '';
      const hasSearch = !!this.searchControl.value;
      if (hasSearch) {
        this.searchControl.setValue('', { emitEvent: false });
      }
      // Call API only once with cleared search and filter
      this.getAllRents(1, this.pageSize, '', '');
    } else {
      this.activeFilter = filter;
      const searchTerm = this.searchControl.value || '';
      this.getAllRents(1, this.pageSize, searchTerm, this.activeFilter);
    }
  }

  getMonthName(monthNumber: number): string {
    return this.monthNames[monthNumber - 1];
  }

}
