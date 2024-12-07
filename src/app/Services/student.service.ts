import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private stdData: any;
  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/students`;

  getAllStudents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllStudents`);
  }

  getStudentById(stdId: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getStudentById`, stdId);
  }

  createStudent(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createStudent`, studentData);
  }

  updateStudentRecord(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/updateStudent`, studentData);
  }

  deleteStudent(stdId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteStudent`, {body: stdId});
  }

  setStudentData(data: any) {
    this.stdData = data;
  }

  getStudentData() {
    return this.stdData;
  }



}
