import { Component } from '@angular/core';
import * as data from './dashboard-data';
import { WebSocketService } from 'src/app/providers/core/web-socket.service';
import { DashboardService } from 'src/app/providers/dashboard/dashboard.service';
import { DashboardHelper } from './dashboard.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  

  constructor(private websocketService: WebSocketService,private dashboardService:DashboardService, private dashboardHelper:DashboardHelper) {}
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;

  ngOnInit(){
    this.getAllDetails();
    // this.initializeSocketConnection();
    this.receiveSocketResponse();
  }

  getAllDetails(){
    this.dashboardService.getAllDetails().subscribe({
      next: (res: any) => {
        this.tableValues = this.dashboardHelper.mapUserData(res.workOrders);
      },
      error: (err) => {
      },
      complete() {
      },
    })
  }

  viewDetails(data: any){
    console.log(data);
  }

  ngOnDestroy() {
    // this.disconnectSocket();
   }
  
   // Initializes socket connection
  //  initializeSocketConnection() {
  //   this.websocketService.connectSocket('message');
  //  }
  
   // Receives response from socket connection 
   receiveSocketResponse() {
    this.websocketService.receiveStatus().subscribe(
      {
        next: (res) => {
         console.log('res::',res);
        },
        error: (err) => {
          console.log(err);
         },
        complete: () => {
       }
      }
    );
   }
  
   // Disconnects socket connection
  //  disconnectSocket() {
  //   this.websocketService.disconnectSocket();
  //  }
}
