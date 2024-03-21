import { Component } from '@angular/core';
import * as data from './roles-data';
import { RoleService } from 'src/app/providers/role/role.service';
import { RoleHelper } from './role.helper';
import { AddRolesComponent } from '../add-roles/add-roles.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {

  constructor(private roleService:RoleService, private roleHelper:RoleHelper, private dialog: MatDialog){}
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;

  ngOnInit(){
    console.log('hii');
    this.getRoleDetails();
  }


  getRoleDetails(){
    this.roleService.getRoleDetail().subscribe({
      next: (res: any) => {
        console.log('res----',res.roles);
        this.tableValues = this.roleHelper.mapUserData(res.roles);
        // console.log('menu-----', this.tableValues);
      },
      error: (err) => {
      },
      complete() {
      },
    })
  }

  addRole(){
    this.dialog.open(AddRolesComponent, {
      width: '653px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.getRoleDetails();
      }
    });
  }

  editRole(data: any){
    this.dialog.open(AddRolesComponent, {
      width: '653px',
      height: 'max-content',
      disableClose: true,
      data: data,
      panelClass: 'user-dialog-container',
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.getRoleDetails();
      }
    });
  }

  deleteRole(id: string){
    this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '150px',
      disableClose: true,
      data:  {id:id, msg:'Are you sure, you want to delete this role?'},
      panelClass: 'confirm-dialog-container',
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.deleteRoleDetails(id);
      }
    });
  }

  deleteRoleDetails(id: string){

  }

}
