import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RentService } from 'src/app/Services/rent.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.scss']
})
export class RentDetailsComponent implements OnInit {

  rentInfo: any;
  activeFilter: string = 'all';
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
    
  constructor(private rentService: RentService) { }

  ngOnInit(): void {
    this.getAllRents();
  }

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }

  getMonthName(monthNumber: number): string {
    return this.monthNames[monthNumber - 1];
  }

  deleteRent(data: any) {

  }

  getAllRents() {
    this.rentService.getAllRentRecords().subscribe((res: any) => {
      this.rentInfo = res.data;
    }, (error: any) => {
      console.log("Get All Rent Error: ", error)
    })
  }


}
