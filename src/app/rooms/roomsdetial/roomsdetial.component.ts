import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roomsdetial',
  templateUrl: './roomsdetial.component.html',
  styleUrls: ['./roomsdetial.component.scss']
})
export class RoomsdetialComponent implements OnInit {

  activeFilter: string = 'all';

  setActiveFilter(filter: string): void {
    this.activeFilter = filter;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
