import { Component } from '@angular/core';
import * as data from './dashboard-data';
import { DashboardService } from 'src/app/providers/dashboard/dashboard.service';
import { DashboardHelper } from './dashboard.helper';
import { ShowDetailComponent } from 'src/app/shared/components/show-detail/show-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { WebSocketService } from 'src/app/providers/core/web-socket.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  


  constructor(private websocketService: WebSocketService, private dialog:MatDialog, private dashboardService:DashboardService, private dashboardHelper:DashboardHelper) {}
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
        this.tableValues = this.dashboardHelper.mapUserData(res.data);
      },
      error: (err) => {
      },
      complete() {
      },
    })
  }

  viewDetails(data: any){
    this.dialog.open(ShowDetailComponent, {
      width: '700px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data:data,
    }).afterClosed().subscribe((res) => {
      if(res){
      }
    });
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
