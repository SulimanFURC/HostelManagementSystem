import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/room`;

  getAllRooms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllRooms`);
  }

  createRoom(roomData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createRoom`, roomData);
  }



}
