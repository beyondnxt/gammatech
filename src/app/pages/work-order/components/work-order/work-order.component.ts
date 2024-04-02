import { Component, ViewChild } from '@angular/core';
import * as data from './work-order';
import { WebSocketService } from 'src/app/providers/core/web-socket.service';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from 'src/app/providers/dashboard/dashboard.service';
import { DashboardHelper } from 'src/app/dashboard/components/dashboard/dashboard.helper';
import { CommonService } from 'src/app/providers/core/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { ShowDetailComponent } from 'src/app/shared/components/show-detail/show-detail.component';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage = 0;
  finalCount: any;
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  apiLoader = false;
  totalCount = 0;
  count: any = '';
  query = '';
  category: { name: string; }[] = [
    { name: 'Category 1' },
    { name: 'Category 2' },
    { name: 'Category 3' },
    // Add more dummy data as needed
  ];
  
  constructor(private websocketService: WebSocketService, private dialog:MatDialog, private dashboardService:DashboardService, private dashboardHelper:DashboardHelper, public service:CommonService) {}


  ngOnInit(){
    this.getAllDetails();
    this.secondScannerUpdate();
    this.getTotalCount();
  }

  getAllDetails(){
    this.apiLoader = true;
    const pageData = {
      pageSize: this.service?.calculatePaginationVal(),
      page: isNaN(this.paginator?.pageIndex) ? 1 : this.paginator?.pageIndex + 1 // 1-based index
    }

    this.dashboardService.getAllDetails(pageData, this.query).subscribe({
      next: (res: any) => {
        this.apiLoader = false;
        this.tableValues = this.dashboardHelper.mapUserData(res.data);
        this.totalCount = res.total;
        this.count = res.totalCounts;
      },
      error: (err) => {
      },
      complete() {
      },
    })
  }

  secondScannerUpdate(){
    this.websocketService.receiveUpdateStatus().subscribe(
      {
        next: (res) => {
          this.getAllDetails();
        },
        error: (err) => {
          console.log(err);
         },
        complete: () => {
       }
      }
    );
   }

   getTotalCount(){
    this.dashboardService.getTotalCount().subscribe(
      {
        next: (res) => {
          this.finalCount = (res as any).totalCounts;
          // console.log('11----',this.finalCount);
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

  searchBox(boxName: any){

    this.query='&toteBoxName='+boxName;
    (boxName && this.paginator) && ( this.paginator.pageIndex = 0);
    this.currentPage = 0;
    this.getAllDetails();
  }

}
