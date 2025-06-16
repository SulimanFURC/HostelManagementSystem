import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const token = this.authService.getToken();
    if (this.authService.isAuthenticated() && token && !this.authService.isTokenExpired(token)) {
      // User is logged in and token is valid
      return of(true);
    } else if (this.authService.getRefreshToken() && this.authService.isAuthenticated()) {
      // Try to refresh token only if user is logged in
      return this.authService.refreshToken().pipe(
        map((response: any) => {
          if (response.token) {
            return true;
          } else {
            this.authService.logout();
            return this.router.createUrlTree(['/Auth']);
          }
        }),
        catchError(() => {
          this.authService.logout();
          return of(this.router.createUrlTree(['/Auth']));
        })
      );
    } else {
      this.authService.logout();
      return of(this.router.createUrlTree(['/Auth']));
    }
  }
}
