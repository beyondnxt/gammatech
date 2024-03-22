import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToteboxRoutingModule } from './totebox-routing.module';
import { AddToteBoxComponent } from './component/add-tote-box/add-tote-box.component';


@NgModule({
  declarations: [
    // AddToteBoxComponent
  ],
  imports: [
    CommonModule,
    ToteboxRoutingModule
  ]
})
export class ToteboxModule { }
