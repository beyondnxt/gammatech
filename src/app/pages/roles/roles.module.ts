import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutingModule } from './roles-routing.module';
import { AddRolesComponent } from './components/add-roles/add-roles.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { RolesComponent } from './components/roles/roles.component';


@NgModule({
  declarations: [
    RolesComponent,
    AddRolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule
  ]
})
export class RolesModule { }
