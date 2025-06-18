import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit, OnDestroy {

  invoiceData: any;
  contactEmail: string = 'sullaimaan@gmail.com';
  constructor() { }

  ngOnInit(): void {
    this.invoiceData = JSON.parse(localStorage.getItem('invoiceData') || '{}');
  }

  ngOnDestroy(): void {
    localStorage.removeItem('invoiceData');
  }

}
