import { Component } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/providers/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private dialog:MatDialog, private userService: UserService) {}

  ngOnInit(){
    // this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: (res) => {
        console.log('res-----',res);
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

  editUser(){
    this.dialog.open(AddUserComponent, {
      width: '700px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data:{'id':'101'}
    }).afterClosed().subscribe((res) => {
      if(res){
      }
    });
  }
  deleteUser(){
    this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data:{"msg" : "Are you sure you want to delete?"}
    }).afterClosed().subscribe((res) => {
      if(res){
      }
    });
  }
}
