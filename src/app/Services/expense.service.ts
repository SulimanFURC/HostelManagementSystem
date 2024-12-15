import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = `${environment.apiUrl}/expenses`;
 
   constructor(private http: HttpClient) { }
 
   createExpense(expenseData: any) {
     return this.http.post(`${this.apiUrl}/createExpense`, expenseData);
   }

   getAllExpenses(page: number, pageSize: number) {
     return this.http.get(`${this.apiUrl}/getAllExpenses`, {
      params: { page: page.toString(), pageSize: pageSize.toString() },
    });
   }
 
   deleteExpense(expenseId: any) {
     return this.http.delete(`${this.apiUrl}/deleteExpense`, {body: expenseId});
   }
}
