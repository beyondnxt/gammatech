import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToteboxRoutingModule } from './totebox-routing.module';
import { AddToteBoxComponent } from './component/add-tote-box/add-tote-box.component';
import { ToteboxComponent } from './component/totebox/totebox.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [
    ToteboxComponent,
    AddToteBoxComponent
  ],
  imports: [
    CommonModule,
    ToteboxRoutingModule,
    SharedModule
  ]
})
export class ToteboxModule { }
