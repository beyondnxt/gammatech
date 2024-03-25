import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { SharedModule } from "../../shared/modules/shared.module";



@NgModule({
    declarations: [
        WorkOrderComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class WorkOrderModule { }
