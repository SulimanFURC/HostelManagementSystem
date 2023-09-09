
import { Component, OnInit,} from '@angular/core';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.scss']
})
export class DashboardChartsComponent implements OnInit {
  
  months: string[] = [
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

  constructor() {

  }

  ngOnInit(): void {
    this.RenderChart()
  }

  RenderChart () {
    new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.months.slice(0, 6),
        datasets: 
        [
          {
          label: 'Monthly Income',
          data: [65000, 60000, 68000, 66000, 59000, 50000, 58000],
          },
          {
            label: 'Monthly Expenses',
            data: [70000, 58000, 60000, 67000, 40000, 45000, 65000],
          },
          {
            label: 'Total Savings',
            data: [-5000, 2000, 8000, -1000, 19000, 5000, -7000],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
