import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/users`; // Update with your API URL

  private isLoginSubject = new BehaviorSubject<boolean>(this.getStoredLoginStatus());
  isLogin$ = this.isLoginSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Method to update the isLogin variable
  setLoginStatus(isLoggedIn: boolean) {
    this.isLoginSubject.next(isLoggedIn);
    localStorage.setItem('isLogin', isLoggedIn.toString());
  }

  // Method to get the login status from localstorage
  private getStoredLoginStatus() {
    const storedStatus = localStorage.getItem('isLogin');
    return storedStatus ? JSON.parse(storedStatus) : false;
  }

  // Method to check if the user is logged in
  isAuthenticated() {
    return this.isLoginSubject.value;
  }

  // Method to clear or logout the login status from localStorage 
  logout() {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.isLoginSubject.next(false);
  }

  // Login user
  login(email: string, password: string): Observable<any> {
    debugger;
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        debugger;
        if (response.token && response.refreshToken) {
          this.setLoginStatus(true);
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      })
    );
  }

  // Get the token from local storage
  getToken() {
    return localStorage.getItem('token');
  }

  // Get the refresh token from local storage
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  // Refresh the token
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    return (decoded.exp * 1000) < Date.now();
  }

  // Ensure the token is valid, otherwise refresh it
  ensureTokenIsValid(): Observable<any> {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return new BehaviorSubject({ token }).asObservable(); // Token is valid
    } else {
      return this.refreshToken(); // Token is expired, refresh it
    }
  }


  // Register user
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }
}
