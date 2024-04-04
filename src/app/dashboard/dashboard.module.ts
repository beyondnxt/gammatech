import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/modules/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgSelectModule
  ]
})
export class DashboardModule { }
