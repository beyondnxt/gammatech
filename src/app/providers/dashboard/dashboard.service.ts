import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/Environments/environment';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public http:HttpClient) { }

  getAllDetails(pageData: any, query: string, shiftQry: any, userQry: any, passQry: any, statusQry: any, fromDate: any, toDate: any){
    return this.http.get(environment.BASE_URL + `/work-order?page=${pageData.page}${query}${shiftQry}${userQry}${passQry}${statusQry}&startDate=${fromDate}&endDate=${toDate}`);
  }
  getTotalCount(){
    return this.http.get(environment.BASE_URL + `/work-order/totalCount`);
  }
  getFilterData(){
    return this.http.get(environment.BASE_URL + `/work-order?page=all`);
  }
  getUserFilterData(){
    return this.http.get(environment.BASE_URL + `/user/filter`);
  }
  getStatusFilterData(){
    return this.http.get(environment.BASE_URL + `/user/filter`);
  }
  getDashboardDataBasedOnStatus(pageData: any, status: any, query: any){
    return this.http.get(environment.BASE_URL + `/work-order?page=${pageData.page}${status}${query}`);
  }
  exportToExcel(data: any[], fileName: string, sheetName: string){
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
   }
}
