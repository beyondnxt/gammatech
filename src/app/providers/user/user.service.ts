import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get(environment.BASE_URL + '/user');
  }
  deleteUser(id:string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/user/${id}`);
  }
}
