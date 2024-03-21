import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CommonService } from '../core/common.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private service: CommonService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');
    const userid = localStorage.getItem('userId');

    // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNzExMDE2NTAyLCJleHAiOjE3MTExMDI5MDJ9.vMw6ufRSVYDsivevrmDP3OzAxzm-RRGE98QxjvBBkK8';
    // const userid = '7'

    if (authToken && userid) {
      req = req.clone({
        headers: req.headers.set('Authorization', authToken).set('UserId', userid)
      });
    }
    console.log('11--',req.headers);
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.service.showSnackbar("Unauthorized access. Please log in again.");
          this.router.navigate(['login']);
          return throwError(error);
        } else {
          console.error('HTTP error:', error);
        }
        return throwError(error);
      })
    );
  }
}
