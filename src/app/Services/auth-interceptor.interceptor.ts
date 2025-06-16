import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LoaderServiceService } from './loader-service.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private loaderService: LoaderServiceService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();

    return next.handle(this.addToken(request)).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Only try to refresh if user is logged in and refresh token exists
          if (this.authService.isAuthenticated() && this.authService.getRefreshToken()) {
            return this.handle401Error(request, next);
          } else {
            this.authService.logout();
            setTimeout(() => this.router.navigate(['/Auth']), 0);
            return throwError(() => error);
          }
        } else {
          this.handleNonAuthError(error);
          return throwError(() => error);
        }
      }),
      finalize(() => this.loaderService.hide())
    );
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);

        return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
                this.isRefreshing = false;
                const newToken = response.token;
                this.authService.setLoginStatus(true); // Ensure user is still marked as logged in
                this.refreshTokenSubject.next(newToken); // Notify other requests about the new token
                return next.handle(this.addToken(request, newToken)); // Use the new token
            }),
            catchError((error) => {
                this.isRefreshing = false;
                this.authService.logout(); // Logout on refresh token failure
                setTimeout(() => this.router.navigate(['/Auth']), 0); // Ensure navigation happens outside current context
                return throwError(() => error); // Optionally, you can use EMPTY from 'rxjs' to stop further propagation
            })
        );
    } else {
        // Queue subsequent requests until the refresh is complete
        return this.refreshTokenSubject.pipe(
            filter(token => token !== null), // Wait for the new token
            take(1), // Complete after receiving the new token
            switchMap((token) => next.handle(this.addToken(request, token)))
        );
    }
}

private addToken(request: HttpRequest<unknown>, token?: string): HttpRequest<unknown> {
    const authToken = token || this.authService.getToken();
    if (authToken) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`
            }
        });
    } else {
        console.warn('No authentication token found. Proceeding without Authorization header.');
    }
    return request;
}

  private handleNonAuthError(error: HttpErrorResponse): void {
    if (error.status === 403) {
      console.error('Access Denied');
      // Add redirection or alert logic here
      // Example: this.router.navigate(['/access-denied']);
    } else {
      console.error(`HTTP Error: ${error.status} - ${error.message}`);
    }
  }
}
