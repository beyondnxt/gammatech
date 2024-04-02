import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from 'src/app/providers/core/common.service';
import { ToteboxService } from 'src/app/providers/tote-box/totebox.service';
import * as data from './notification-data';
import { ScannerTableComponent } from 'src/app/shared/scanner-table/scanner-table.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('childRef') scannerTableComponent!: ScannerTableComponent;
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  totalCount = 0;
  apiLoader = false;
  currentPage = 0;
  selectedIds: any = [];
  constructor(public service:CommonService, private toteBoxService:ToteboxService) {}
  ngOnInit(){
    this.getNotifiedData()
  }

  getNotifiedData(){
    this.apiLoader = true;
    const pageData = {
      pageSize: this.service?.calculatePaginationVal(),
      page: isNaN(this.paginator?.pageIndex) ? 1 : this.paginator?.pageIndex + 1
    }

    this.toteBoxService.getAllNotifiedData(pageData).subscribe({
      next: (res: any) => {
        this.apiLoader = false;
        this.tableValues = res.data;
        this.totalCount = res.total;
      },
      error: (err) => {
      },
      complete() {
      },
    })
  }

  selectAll(data: any) {
    data.forEach((item: any) => {
      const index = this.selectedIds.indexOf(item);
      index === -1 ? this.selectedIds.push(item) : this.selectedIds.splice(index, 1);
    });
  }

  getIds(ids: string) {
    const index = this.selectedIds.indexOf(ids);
    index === -1 ? this.selectedIds.push(ids) : this.selectedIds.splice(index, 1);

    if (this.selectedIds.length == this.scannerTableComponent.tableValues.length) {
      this.scannerTableComponent.isSelectAll = true;
    } else {
      this.scannerTableComponent.isSelectAll = false;
    }
  }

  onPageChange(event: any): void {
    this.scannerTableComponent.isSelectAll = false;
    this.currentPage = this.paginator.pageIndex;
    this.getNotifiedData();
  }

}
