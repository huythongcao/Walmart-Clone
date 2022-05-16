// Nhiệm vụ của interceptor là can thiệp tất cả request của user lên server
// Interceptor sẽ gửi lên server 1 request là authorization, trong đó có token của user
// Việc của bên back-end sẽ là kiểm tra trong token đó có trường là admin hay không để có quyền thay đổi, sửa xóa, tác động lên server 
// Việc của front end là gửi authorization lên thôi 


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
      // clone() method creates a copy of the current Request object.
      // Tạo clone là để đảm bảo sự an toàn đối với request gốc 
      const authReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.user.token,
        },
      });
      // handle(): Handle the given request and generate an appropriate response
      // Param là 1 request
      // return về 1 observable 
      // Ở đây sẽ handle request được clone
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
