import { Component, ElementRef, ViewChild } from '@angular/core';
import * as data from './work-order';
import { WebSocketService } from 'src/app/providers/core/web-socket.service';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from 'src/app/providers/dashboard/dashboard.service';
import { DashboardHelper } from 'src/app/dashboard/components/dashboard/dashboard.helper';
import { CommonService } from 'src/app/providers/core/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { ShowDetailComponent } from 'src/app/shared/components/show-detail/show-detail.component';
// import { FormBuilder, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
  selectedCityIds: string[] | undefined;
  showOrHide = false;
  selectedOptions: string[] = [];
  shift = [
    { id: 'AM', name: 'AM' },
    { id: 'FN', name: 'FN' },
    { id: 'PM', name: 'PM' }
  ];
  selectedItems = [];
  shiftQry = '';
  userQry = '';
  passQry = '';
  statusQry = '';
  pageCount = 0;
  noofPass: any;
  user: any;
  currentStatus: any;
  fromDate = '';
  toDate = '';
  // selectedOptions = new FormControl([]);

  constructor(private websocketService: WebSocketService, private dialog: MatDialog, private dashboardService: DashboardService, private dashboardHelper: DashboardHelper, public service: CommonService) { }
  @ViewChild('fromDateInput') fromDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('toDateInput') toDateInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.getAllDetails();
    this.getAllDetailsForFilter();
    // this.secondScannerUpdate();
    // this.getTotalCount();
  }

  getShift(shift: any) {
    this.shiftQry = `&shiftTime=${shift.value}`;
    this.getAllDetails();
  }
  users(user: any) {
    this.userQry = `&userName=${user.value}`;
    this.getAllDetails();
  }
  noOfPass(pass: any) {
    this.passQry = `&noOfPass=${pass.value}`;
    this.getAllDetails();
  }
  getCurrentStatus(status: any) {
    this.statusQry = `&currentStatus=${status.value}`;
    this.getAllDetails();
  }

  getAllDetailsForFilter() {
    this.dashboardService.getFilterData().subscribe(
      {
        next: (res: any) => {
          if (Array.isArray(res.data)) {
            const uniqueUsers = new Set();
            const uniquepass = new Set();
            const uniqueStatus = new Set();
            res.data.forEach((item: any) => {
              if (item.loading && item.loading.userName) {
                uniqueUsers.add(item.loading.userName);
              }
              if (item.noOfPass) {
                uniquepass.add(item.noOfPass);
              }
              if (item.currentStatus) {
                uniqueStatus.add(item.currentStatus);
              }
            });
            this.user = Array.from(uniqueUsers);
            this.noofPass = Array.from(uniquepass).sort((a: any, b: any) => a - b);
            this.currentStatus = Array.from(uniqueStatus);
          }
        },
        error: (err) => {
        },
        complete: () => {
        }
      }
    );
  }

  onFromDateChange(event: MatDatepickerInputEvent<Date>) {
    this.fromDate = this.dateFormat(event.value);
    this.dateCheck();
  }
  onToDateChange(event: MatDatepickerInputEvent<Date>) {
    this.toDate = this.dateFormat(event.value);
    this.dateCheck();
  }

  dateFormat(date: any) {
    if (date != null) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
    else {
      return date;
    }
  }

  dateCheck(){
    if (!this.fromDate || !this.toDate) {
      return;
    }
    if (this.fromDate > this.toDate) {
      this.fromDate = this.toDate = '';
      this.fromDateInput.nativeElement.value = '';
      this.toDateInput.nativeElement.value = '';
      this.getAllDetails();
      this.service.showSnackbar("End date should be greater than start date");
      return;
    }
    this.getAllDetails();
  }
  
  getAllDetails() {
    this.showOrHide = false;
    this.apiLoader = true;
    const pageData = {
      pageSize: this.service?.calculatePaginationVal(),
      page: isNaN(this.paginator?.pageIndex) ? 1 : this.paginator?.pageIndex + 1 // 1-based index
    }
    this.dashboardService.getAllDetails(pageData, this.query, this.shiftQry, this.userQry, this.passQry, this.statusQry,this.fromDate, this.toDate).subscribe({
      next: (res: any) => {
        !res.data.length && (this.showOrHide = true);
        this.apiLoader = false;
        this.tableValues = this.dashboardHelper.mapUserData(res.data);
        this.totalCount = res.total;
        this.count = res.total;
        this.pageCount = pageData.pageSize;
      },
      error: (err) => {
      },
      complete() {
      },
    })
  }

  secondScannerUpdate() {
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

  // getTotalCount() {
  //   this.dashboardService.getTotalCount().subscribe(
  //     {
  //       next: (res) => {
  //         this.finalCount = (res as any).totalCounts;
  //         // console.log('11----',this.finalCount);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //       complete: () => {
  //       }
  //     }
  //   );
  // }

  onPageChange(event: any): void {
    this.tableValues = [];
    this.currentPage = this.paginator.pageIndex;
    this.getAllDetails();
  }

  viewDetails(data: any) {
    this.dialog.open(ShowDetailComponent, {
      width: '700px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data: data,
    }).afterClosed().subscribe((res) => {
      if (res) {
      }
    });
  }

  searchBox(boxName: any) {

    this.query = '&toteBoxName=' + boxName;
    (boxName && this.paginator) && (this.paginator.pageIndex = 0);
    this.currentPage = 0;
    this.getAllDetails();
  }

  onSelectionChange(data: any){

  }
}
