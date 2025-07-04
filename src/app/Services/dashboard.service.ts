import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

   private apiUrl = `${environment.apiUrl}/dashboard/`;

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getDashboardData`);
  }

  getDashboardChart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getDashboardChart`);
  }
}
