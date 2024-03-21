import { Component } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/providers/user/user.service';
import * as data from './user-data';
import { UserHelper } from './user.helper';
import { CommonService } from 'src/app/providers/core/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private dialog:MatDialog, private userService: UserService, private userHelper: UserHelper, private service: CommonService) {}

  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;

  ngOnInit(){
    this.getAllUsers();
    // this.getUsers();
  }

  getAllUsers(){
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.tableValues = this.userHelper.mapUserData(res.data);
      },
      error: (err) => {

      },
      complete(){

      },
    })
  }

  addUser(){
    this.dialog.open(AddUserComponent, {
      width: '700px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
    }).afterClosed().subscribe((res) => {
      if(res){
      }
    });
  }

  editUser(data: any){
    this.dialog.open(AddUserComponent, {
      width: '700px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data:data
    }).afterClosed().subscribe((res) => {
      if(res){
      }
    });
  }

  deleteUser(id: string){
    this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data:{"msg" : "Are you sure you want to delete?"}
    }).afterClosed().subscribe((res) => {
      if(res){
        this.deleteUserDetails(id);
      }
    });
  }

  deleteUserDetails(id: string){
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.service.showSnackbar("User Deleted Successfully");
        this.getAllUsers();
      },
      error: (err) => {
      },
      complete() {
      },
    })
  }
}
