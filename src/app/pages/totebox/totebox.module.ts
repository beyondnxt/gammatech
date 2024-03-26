import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToteboxRoutingModule } from './totebox-routing.module';
import { AddToteBoxComponent } from './component/add-tote-box/add-tote-box.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ToteboxComponent } from './component/totebox/totebox.component';


@NgModule({
  declarations: [
     AddToteBoxComponent,
     ToteboxComponent
  ],
  imports: [
    CommonModule,
    ToteboxRoutingModule,
    SharedModule
  ]
})
export class ToteboxModule { }
