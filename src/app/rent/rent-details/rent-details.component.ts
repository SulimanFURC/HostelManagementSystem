import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.scss']
})
export class RentDetailsComponent implements OnInit {


  rentInfo = [ 
    {
      name: 'Suliman',
      Month: 'January',
      Year: 2023,
      RentStatus: 'Paid',
      RentType: 'Cash',
      BasicRent: 7500,
      PaidAmount: 6500,
      Arrers: 1000,
    },
    {
      name: 'Samir',
      Month: 'January',
      Year: 2023,
      RentStatus: 'Unpaid',
      RentType: 'Easypaisa',
      BasicRent: 7500,
      PaidAmount: 7000,
      Arrers: 500,
    },
    {
      name: 'Khan',
      Month: 'January',
      Year: 2023,
      RentStatus: 'Installment',
      RentType: 'Bank Transfer',
      BasicRent: 7500,
      PaidAmount: 7500,
      Arrers: 0,
    },
  ]

  activeFilter: string = 'all';

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }
  
  constructor() { }

  ngOnInit(): void {
  }


}
