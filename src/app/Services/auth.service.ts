import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Create a BehaviorSubject with an initial value of false
  private isLoginSubject = new BehaviorSubject<boolean>(this.getStoredLoginStatus());

  // Observable to track the isLogin variable
  isLogin$ = this.isLoginSubject.asObservable();
  

  constructor() {   }

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
    this.isLoginSubject.next(false);
  }
}
