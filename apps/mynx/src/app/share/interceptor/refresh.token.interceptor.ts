import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    return next.handle(req).pipe(
      map((event: HttpEvent < any > ) => {
        console.log('sss',req);
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('RefreshTokenInterceptor', 401 === error.error.statusCode);
        if(401 === error.error.statusCode){
          const auth = this.getLocal(environment.session_key);
          console.log('sssss', auth['token']);
        }
        return next.handle(req);
        // if (error.status === 401 && error.error.token) {
        //   console.log('RefreshTokenInterceptor', error.error);
        //   localStorage.setItem('token', error.error.token);
        //   req = req.clone({
        //     headers: req.headers.set('Authorization', 'Bearer ' + error.error.token)
        //   });
        //   req = req.clone({
        //     headers: req.headers.set('Accept', 'application/json')
        //   });
        //   return next.handle(req);
        // }
      }));

    // console.log('sss',req);
    // return next.handle(req);
  }

  getLocal(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null') || null;
  }
}
