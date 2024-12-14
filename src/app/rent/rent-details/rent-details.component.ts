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
    this.getAllRents();
  }

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }

  getMonthName(monthNumber: number): string {
    return this.monthNames[monthNumber - 1];
  }

  deleteRent(id: any) {
    console.log("Selected Rent ID: ", id);
    let payload = {
      "rentID": id
   }
    this.rentService.deleteRentRecord(payload).subscribe((res: any) => {
      console.log("Rent Deleted: ", res);
      this.getAllRents();
    })
  }

  getAllRents() {
    this.rentService.getAllRentRecords().subscribe((res: any) => {
      this.rentInfo = res.data;
    }, (error: any) => {
      console.log("Get All Rent Error: ", error)
    })
  }

}
