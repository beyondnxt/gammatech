import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToteboxService {

  constructor(public http: HttpClient) { }

  getBoxes(){
    return this.http.get(environment.BASE_URL + '/tote');
  }
  updateBox(id:string,payload: any): Observable<any> {
    return this.http.put(environment.BASE_URL + `/tote/${id}`, payload);
  }
  deleteBox(id:string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/tote/${id}`);
  }
  postBox(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + `/tote`, payload);
  }
}
