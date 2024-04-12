import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(public http: HttpClient) { }

  connectPort(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + `/settings`, payload);
  }
  getConnectionDetail(){
    return this.http.get(environment.BASE_URL + `/settings`);
  }
  getAvailablePorts(){
    return this.http.get(environment.BASE_URL + `/settings/ports`);
  }
  
}
