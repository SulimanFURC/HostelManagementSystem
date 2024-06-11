import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {

  dashboardData: any;

  constructor(private dashboard: DashboardService) { }

  ngOnInit(): void {
    this.dashboard.getDashboardData().subscribe(data => {
      this.dashboardData = data;
      console.log(this.dashboardData);
    }, error => {
      console.log(error);
    })
  }
  

}
