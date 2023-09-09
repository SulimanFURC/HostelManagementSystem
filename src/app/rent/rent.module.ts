import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentWrapperComponent } from './rent-wrapper/rent-wrapper.component';
import { RentFormComponent } from './rent-form/rent-form.component';
import { RentDetailsComponent } from './rent-details/rent-details.component';
import { SharedModule } from '../shared/shared.module';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    RentWrapperComponent,
    RentFormComponent,
    RentDetailsComponent,
    CreateInvoiceComponent
  ],
  imports: [
    CommonModule,
    RentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class RentModule { }
