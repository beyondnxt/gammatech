import { Component } from '@angular/core';
import * as data from './dashboard-data';
import { DashboardService } from 'src/app/providers/dashboard/dashboard.service';
import { DashboardHelper } from './dashboard.helper';
import { ShowDetailComponent } from 'src/app/shared/components/show-detail/show-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private dialog:MatDialog,private dashboardService:DashboardService, private dashboardHelper:DashboardHelper) {}
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;

  ngOnInit(){
    this.getAllDetails();
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
  
}
