import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public http:HttpClient) { }

  getRole(): Observable<any> {
    return this.http.get(environment.BASE_URL + `/role`);
  }
  getRoleDetail(pageData: any): Observable<any> {
    return this.http.get(environment.BASE_URL + `/role?page=${pageData.page}`);
  }
  updateRole(id:string,payload: any): Observable<any> {
    return this.http.put(environment.BASE_URL + `/role/${id}`, payload);
  }
  deleteRole(id:string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/role/${id}`);
  }
  postRole(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + `/role`, payload);
  }
  getRoleById(id:string): Observable<any> {
    return this.http.get(environment.BASE_URL + `/role/${id}`);
  }
}
