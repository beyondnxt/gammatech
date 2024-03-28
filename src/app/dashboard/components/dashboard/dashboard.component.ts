import { Component, ViewChild } from '@angular/core';
import * as data from './dashboard-data';
import { DashboardService } from 'src/app/providers/dashboard/dashboard.service';
import { DashboardHelper } from './dashboard.helper';
import { ShowDetailComponent } from 'src/app/shared/components/show-detail/show-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { WebSocketService } from 'src/app/providers/core/web-socket.service';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from 'src/app/providers/core/common.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private websocketService: WebSocketService, private dialog:MatDialog, private dashboardService:DashboardService, private dashboardHelper:DashboardHelper, public service:CommonService) {}
 tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  currentPage = 0;
  totalCount = 0;
  apiLoader = false;

  ngOnInit(){
    this.getAllDetails();
    // this.initializeSocketConnection();
    this.receiveSocketResponse();
  }

  getAllDetails(){
    this.apiLoader = true;
    const pageData = {
      pageSize: this.service?.calculatePaginationVal(),
      page: isNaN(this.paginator?.pageIndex) ? 1 : this.paginator?.pageIndex + 1 // 1-based index
    }

    this.dashboardService.getAllDetails(pageData).subscribe({
      next: (res: any) => {
        this.apiLoader = false;
        this.tableValues = this.dashboardHelper.mapUserData(res.data);
        this.totalCount = res.total;
      },
      error: (err) => {
      },
      complete() {
      },
    })
  }

  onPageChange(event: any): void {
    this.currentPage = this.paginator.pageIndex;
    this.getAllDetails();
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
