import { Component, ViewChild } from '@angular/core';
import * as data from './totebox-data';
import { CommonService } from 'src/app/providers/core/common.service';
import { ToteboxService } from 'src/app/providers/tote-box/totebox.service';
import { AddToteBoxComponent } from '../add-tote-box/add-tote-box.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ToteboxHelper } from './totebox.helper';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-totebox',
  templateUrl: './totebox.component.html',
  styleUrls: ['./totebox.component.scss']
})
export class ToteboxComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialog:MatDialog, public service: CommonService, private toteboxService: ToteboxService, private boxHelper:ToteboxHelper) { }
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  currentPage = 0;
  totalCount = 0;
  apiLoader = false;

  ngOnInit() {
    this.getAllBoxes();
  }

  getAllBoxes() {
    this.apiLoader = true;
    const pageData = {
      pageSize: this.service?.calculatePaginationVal(),
      page: isNaN(this.paginator?.pageIndex) ? 1 : this.paginator?.pageIndex + 1 // 1-based index
    }

    this.toteboxService.getBoxes(pageData).subscribe({
      next: (res) => {
        this.apiLoader = false;
        const toteBoxes = (res as any).data;
        this.tableValues = this.boxHelper.mapUserData(toteBoxes);
        this.totalCount = (res as any).total;
      },
      error: (err) => {

      },
      complete(){

      },
    })
  }

  onPageChange(event: any): void {
    this.currentPage = this.paginator.pageIndex;
    this.getAllBoxes();
  }

  addBox() {
    this.dialog.open(AddToteBoxComponent, {
      width: '700px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
    }).afterClosed().subscribe((res) => {
      if(res){
        this.getAllBoxes();
      }
    });
  }

  editBoxDetails(data: any) {
    this.dialog.open(AddToteBoxComponent, {
      width: '700px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data:data
    }).afterClosed().subscribe((res) => {
      if(res){
        this.getAllBoxes();
      }
    });
  }

  deleteBoxDetails(id : string) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data:{"msg" : "Are you sure you want to delete?"}
    }).afterClosed().subscribe((res) => {
      if(res){
        this.deleteBoxId(id);
      }
    });
  }

  deleteBoxId(id: string){
    this.toteboxService.deleteBox(id).subscribe({
      next: (res) => {
        this.service.showSnackbar("User Deleted Successfully");
        this.getAllBoxes();
      },
      error: (err) => {
      },
      complete() {
      },
    })
  }

}
