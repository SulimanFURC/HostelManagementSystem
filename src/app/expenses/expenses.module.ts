import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpenseComponent } from './expense/expense.component';
import { SharedModule } from '../shared/shared.module';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    ExpenseComponent,
    CreateExpenseComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class ExpensesModule { }
