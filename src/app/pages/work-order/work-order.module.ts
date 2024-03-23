import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderComponent } from './components/work-order/work-order.component';
import { SharedModule } from "../../shared/modules/shared.module";
import { FormDataComponent } from 'src/app/shared/components/form-data/form-data.component';



@NgModule({
    declarations: [
        WorkOrderComponent,
        FormDataComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class WorkOrderModule { }
