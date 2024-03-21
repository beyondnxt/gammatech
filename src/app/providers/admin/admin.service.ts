import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http:HttpClient) { }

  login(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + '/auth/signin', payload);
  }
  saveNewUser(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + '/auth/signup', payload);  
  }
  updateUser(id:string,payload: any): Observable<any> {
    return this.http.put(environment.BASE_URL + `/user/${id}`, payload);
  }
}
