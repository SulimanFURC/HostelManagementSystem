import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private apiUrl = `${environment.apiUrl}/rental`;

  constructor(private http: HttpClient) { }

  createRentRecord(rentData: any) {
    return this.http.post(`${this.apiUrl}/createRental`, rentData);
  }
  
  getAllRentRecords(page: number, pageSize: number) {
    return this.http.get(`${this.apiUrl}/getAllRentals`, {
      params: { page: page.toString(), pageSize: pageSize.toString() },
    });
  }

  deleteRentRecord(rentId: any) {
    return this.http.delete(`${this.apiUrl}/deleteRental`, {body: rentId});
  }

  stuentRentalRecord(rentId: any) {
    return this.http.post(`${this.apiUrl}/getStudentRentDetails`, rentId);
  }
}
