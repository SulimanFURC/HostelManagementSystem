
import { Component, OnInit,} from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from 'src/app/Services/dashboard.service';



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

  constructor(private dashboard: DashboardService) {

  }

  ngOnInit(): void {
    this.chartData()
  }

  chartData() {
    this.dashboard.getDashboardChart().subscribe((data: any) => {
      const labels = data.map((d: any) => `${this.months[d.month - 1]}`);
      const incomeData = data.map((d: any) => d.income);
      const expenseData = data.map((d: any) => d.expense);
      const savingsData = data.map((d: any) => d.savings);

      this.RenderChart(labels, incomeData, expenseData, savingsData);
    })
  }

  RenderChart (labels: string[], incomeData: number[], expenseData: number[], savingsData: number[]) {
    new Chart('myChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: 
        [
          {
          label: 'Monthly Income',
          data: incomeData,
          },
          {
            label: 'Monthly Expenses',
            data: expenseData,
          },
          {
            label: 'Total Savings',
            data: savingsData,
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
