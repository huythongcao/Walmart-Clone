import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);
    // co the kiem tra ca request va respone, vd server tra ve 401 => redirectTo den trang login tai day
    if (this.authService.isLoggedIn()) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.user.token,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
