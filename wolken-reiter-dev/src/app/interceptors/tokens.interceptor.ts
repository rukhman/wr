import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, takeWhile, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokensInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenAvailable = new BehaviorSubject(false);

  constructor(private authService: AuthService) {}

  addAuthToken(request: HttpRequest<any>) {
    const token = this.authService.getToken();
    if (!token) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request)).pipe(
      catchError((requestError: HttpErrorResponse) => {
        //если возникли ошибки
        if (requestError && requestError.status === 401) {
          if (this.refreshTokenInProgress) {
            return this.refreshTokenAvailable.pipe(
              filter((result: any) => result),
              take(1),
              switchMap(() => next.handle(this.addAuthToken(request)))
            );
          } else {
            // тут мы обновляем токены
            this.refreshTokenInProgress = true;
            this.refreshTokenAvailable.next(false);

            return this.authService.refreshTokens().pipe(
              switchMap(() => {
                this.refreshTokenAvailable.next(true);
                return next.handle(this.addAuthToken(request));
              }),
              finalize(() => (this.refreshTokenInProgress = false))
            );
          }
        }
        else {
          return throwError(() => new Error(requestError.message));
        }
      })
    );
  }
}
