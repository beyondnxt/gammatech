import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http:HttpClient) { }

  getRoleDetail(): Observable<any> {
    return this.http.get(environment.BASE_URL + `/role`);
  }
}
