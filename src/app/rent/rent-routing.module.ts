import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentWrapperComponent } from './rent-wrapper/rent-wrapper.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

const routes: Routes = [
  { path: '', component: RentWrapperComponent },
  { path: 'invoice', component: CreateInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRoutingModule { }
