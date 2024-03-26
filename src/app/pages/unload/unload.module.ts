import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnloadRoutingModule } from './unload-routing.module';
import { FormDataComponent } from 'src/app/shared/components/form-data/form-data.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { UnloadComponent } from './components/unload/unload.component';


@NgModule({
  declarations: [
    UnloadComponent
  ],
  imports: [
    CommonModule,
    UnloadRoutingModule,
    SharedModule,
  ]
})
export class UnloadModule { }
