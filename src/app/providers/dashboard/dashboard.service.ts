import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public http:HttpClient) { }

  getAllDetails(pageData: any, query: string){
    return this.http.get(environment.BASE_URL + `/work-order?page=${pageData.page}${query}`);
  }
  getTotalCount(){
    return this.http.get(environment.BASE_URL + `/work-order/totalCount`);
  }
}
