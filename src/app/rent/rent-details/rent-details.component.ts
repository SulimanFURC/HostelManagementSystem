import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RentService } from 'src/app/Services/rent.service';

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
    
  constructor(private rentService: RentService,) { }

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
      this.getAllRents(this.currentPage, this.pageSize);
    })
  }

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }

  getMonthName(monthNumber: number): string {
    return this.monthNames[monthNumber - 1];
  }

}
