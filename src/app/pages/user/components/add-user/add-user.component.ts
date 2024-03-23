import { Component, INJECTOR, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/providers/admin/admin.service';
import { CommonService } from 'src/app/providers/core/common.service';
import { RoleService } from 'src/app/providers/role/role.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  constructor(private fb:FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService, private service:CommonService, public dialogRef: MatDialogRef<AddUserComponent>, private roleService: RoleService) {}
  roleList:any;
  userDetails = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', this.isPasswordRequired() ? Validators.required : null],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    roleId: ['', [Validators.required]],
    // status: ['', [Validators.required]],
  });

  isPasswordRequired(){
    if (this.data) { return false; } else { return true;}
  }
  
  ngOnInit(){
    console.log('data----', this.data);
    this.getRoles();
    if (this.data) {
      this.userDetails.patchValue(this.data)
    }
  }

  getRoles(){
    this.roleService.getRoleDetail().subscribe({
      next: (res:any) => {
        this.roleList = res?.roles.filter((x: any) => x.name);
        console.log('43-------',this.roleList);
      },
      error: (err) => {
      },
      complete: () => {
      }
    })
  }

  addNewUser(){
    this.userDetails.markAllAsTouched();
    if(this.userDetails.valid){
      if(this.data)
      {
        let formValue: any = this.userDetails.getRawValue();
        if ('password' in formValue) {
          delete formValue.password;
        }
        this.adminService.updateUser(this.data?.id, formValue).subscribe({
          next: (res) => {
            this.userDetails.reset();
            this.dialogRef.close(true);
          },
          error: (err) => {
          },
          complete: () => {
            this.service.showSnackbar('User Updated Successfully');
          }
        })
      }
      else {
        this.adminService.saveNewUser(this.userDetails.getRawValue()).subscribe({
          next: (res) => {
            console.log("success");
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.service.showSnackbar(err.error.message);
          },
          complete: () => {
            this.service.showSnackbar('User Created Successfully'); 
          }
        })
      }

    }else{
      this.service.showSnackbar('Please fill all the required fields'); 
    }
  }
}
