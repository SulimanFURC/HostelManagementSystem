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
  
  getAllRentRecords(page: number, pageSize: number, search?: string, rentStatus?: string) {
    const params: any = {
      page: page.toString(),
      pageSize: pageSize.toString()
    };
    if (search) {
      params.search = search;
    }
    if (rentStatus) {
      params.rentStatus = rentStatus;
    }
    return this.http.get(`${this.apiUrl}/getAllRentals`, { params });
  }

  deleteRentRecord(rentId: any) {
    return this.http.delete(`${this.apiUrl}/deleteRental`, {body: rentId});
  }

  updateRentalRecord(payload: any) {
    return this.http.put(`${this.apiUrl}/updateRental`, payload);
  }

  stuentRentalRecord(rentId: any) {
    return this.http.post(`${this.apiUrl}/getStudentRentDetails`, rentId);
  }
}
