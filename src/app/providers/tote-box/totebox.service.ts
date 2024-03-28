import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToteboxService {

  constructor(public http: HttpClient) { }

  getBoxes(pageData: any){
    return this.http.get(environment.BASE_URL + `/tote?page=${pageData.page}`);
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
  getToteBoxes(data: boolean, query: any){
    return this.http.get(environment.BASE_URL + `/tote?isEmpty=${data}${query}`);
  }
  loadToteBox(payload: any){
    return this.http.post(environment.BASE_URL + `/work-order`, payload);
  }
  getCompletedBoxes(data: boolean){
    return this.http.get(environment.BASE_URL + `/work-order?isCompleted=true&isEmpty=false`);
  }
  unloadToteBox(payload: any, barCode: any){
    return this.http.put(environment.BASE_URL + `/work-order/updateUnloadingTime/${barCode}`, payload);
  }
}
