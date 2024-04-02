import { Component, ViewChild } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/providers/user/user.service';
import * as data from './user-data';
import { UserHelper } from './user.helper';
import { CommonService } from 'src/app/providers/core/common.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog:MatDialog, private userService: UserService, private userHelper: UserHelper, public service: CommonService) {}

  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  currentPage = 0;
  totalCount = 0;
  apiLoader = false;
  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers(){
    this.apiLoader = true;
    const pageData = {
      pageSize: this.service?.calculatePaginationVal(),
      page: isNaN(this.paginator?.pageIndex) ? 1 : this.paginator?.pageIndex + 1
    }
    this.userService.getUsers(pageData).subscribe({
      next: (res) => {
        this.apiLoader = false;
        this.tableValues = this.userHelper.mapUserData(res.data);
        this.totalCount = res.total;
      },
      error: (err) => {
        this.apiLoader = false;
      },
      complete(){

      },
    })
  }

  onPageChange(event: any): void {
    this.currentPage = this.paginator.pageIndex;
    this.getAllUsers();
  }

  addUser(){
    this.dialog.open(AddUserComponent, {
      width: '700px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
    }).afterClosed().subscribe((res) => {
      if(res){
        this.getAllUsers(); 
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
        this.getAllUsers(); 
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
