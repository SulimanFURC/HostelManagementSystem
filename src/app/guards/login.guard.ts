import { AuthService } from './../Services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const token = this.authService.getToken();
    if (token && !this.authService.isTokenExpired(token)) {
      // Already logged in
      return of(this.router.createUrlTree(['Dashboard']));
    } else {
      return of(true);
    }
  }
}
