import { Component } from '@angular/core';
import * as data from './dashboard-data';
import { DashboardService } from 'src/app/providers/dashboard/dashboard.service';
import { DashboardHelper } from './dashboard.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private dashboardService:DashboardService, private dashboardHelper:DashboardHelper) {}
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;

  ngOnInit(){
    this.getAllDetails();
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
}
