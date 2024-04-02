import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { SharedModule } from "../../shared/modules/shared.module";
import { WorkOrderRoutingModule } from './work-order-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [
        WorkOrderComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        WorkOrderRoutingModule,
        NgSelectModule
    ]
})
export class WorkOrderModule { }
