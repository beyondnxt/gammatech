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
  finalCount: any;
  tab = '&currentStatus=loaded';
  constructor(private websocketService: WebSocketService, private dialog:MatDialog, private dashboardService:DashboardService, private dashboardHelper:DashboardHelper, public service:CommonService) {}
  tableHeaders = data.tableHeadersForLoaded;
  tableValues = data.tableValues;
  currentPage = 0;
  totalCount = 0;
  pageCount: any;
  apiLoader = false;
  query = '';
  count: any = '';
  ngOnInit(){
    this.getDashboardDataBasedOnStatus(this.tab);
    // this.initializeSocketConnection();
    this.receiveSocketResponse();
    this.secondScannerUpdate();
    // this.getTotalCount();
  }

  getTotalCount(){
    this.dashboardService.getTotalCount().subscribe(
      {
        next: (res) => {
          this.finalCount = (res as any).totalCounts;
          console.log('11----',this.finalCount);
        },
        error: (err) => {
          console.log(err);
         },
        complete: () => {
       }
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = this.paginator.pageIndex;
    this.getDashboardDataBasedOnStatus(this.tab);
  }

  viewDetails(data: any){
    this.dialog.open(ShowDetailComponent, {
      width: '500px',
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

   secondScannerUpdate(){
    this.websocketService.receiveUpdateStatus().subscribe(
      {
        next: (res) => {
          this.getDashboardDataBasedOnStatus(this.tab);
        },
        error: (err) => {
          console.log(err);
         },
        complete: () => {
       }
      }
    );
   }
  
   searchBox(boxName: any){
    this.query='&toteBoxName='+boxName;
    (boxName && this.paginator) && ( this.paginator.pageIndex = 0);
    this.currentPage = 0;
    this.getDashboardDataBasedOnStatus(this.tab);
  }

   // Disconnects socket connection
  //  disconnectSocket() {
  //   this.websocketService.disconnectSocket();
  //  }

  loadData(tab: string): void {
    this.tableHeaders = [];
    this.tableValues = [];
    switch (tab) {
      case 'loaded':
        this.tableHeaders = data.tableHeadersForLoaded;
        this.tab = '&currentStatus='+tab;
        break;
      case 'inProgress':
        this.tableHeaders = data.tableHeadersForInProgress;
        this.tab = '&currentStatus='+tab;
        break;
      case 'completed':
        this.tableHeaders = data.tableHeadersForCompleted;
        this.tab = '&currentStatus='+tab;
        break;
      case 'empty':
        this.tableHeaders = data.tableHeadersForEmpty;
        this.tab = '&toteIsEmpty=true';
        break;
      default:
        this.tableHeaders = []; // Set to empty array if no matching tab
    }
    this.query = '';
    this.getDashboardDataBasedOnStatus(this.tab);
    }

  getDashboardDataBasedOnStatus(status: any){
    this.apiLoader = true;
    const pageData = {
      pageSize: this.service?.calculatePaginationVal(),
      page: isNaN(this.paginator?.pageIndex) ? 1 : this.paginator?.pageIndex + 1 // 1-based index
    }

    this.dashboardService.getDashboardDataBasedOnStatus(pageData, status, this.query).subscribe({
      next: (res: any) => {
        // console.log('160----', res);
        this.apiLoader = false;
        this.tableValues = this.dashboardHelper.mapUserData(res.data);
        this.totalCount = res.total;
        this.count = res.total;
        this.pageCount = pageData.pageSize;
        this.finalCount = res.totalCounts;
        // console.log('167--------', this.finalCount);
      },
      error: (err) => {
      },
      complete() {
      },
    })
  }
}
