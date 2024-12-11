import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  dashboardData: any;


  constructor(private dashboaord: DashboardService) { }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData() {
    this.dashboaord.getDashboardData().subscribe((res: any) => {
      this.dashboardData = res;
    })
  }

  valueChange(value: any) {
    return Math.abs(value);
  }
}
