import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './components/users/user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [UserComponent, AddUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
