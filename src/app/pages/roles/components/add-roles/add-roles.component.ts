import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/providers/core/common.service';
import { RoleService } from 'src/app/providers/role/role.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent {
  isMenuAccessValid: boolean = true;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, private roleService:RoleService,private service: CommonService,public dialogRef: MatDialogRef<AddRolesComponent>,) { }
  roleData = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    menuAccess: this.fb.group({
      dashboard: [false],
      user: [false],
      role: [false],
      barcode: [false],
      toteBox: [false],
      workOrder: [false],
    }),
  })

  ngOnInit() {
    if (this.dialogData) {
      let data = {
        "name": this.dialogData.name,
        "description": this.dialogData.description,
        "menuAccess": {
          "barcode": this.dialogData.barcode,
          "dashboard": this.dialogData.dashboard,
          "user": this.dialogData.user,
          "role": this.dialogData.role,
          "toteBox": this.dialogData.toteBox,
          "workOrder": this.dialogData.workOrder,

        }
      };
      this.roleData.patchValue(data);
    }
  }

  addRole() {
    console.log('data-----',this.dialogData);
    this.roleData.markAllAsTouched();
    if (this.roleData.valid) {
      if (this.dialogData) {
        this.roleService.updateRole(this.dialogData?.id, this.roleData.getRawValue()).subscribe({
          next: (res) => {
            this.roleData.reset();
            this.dialogRef.close(true);
          },
          error: (err) => {
          },
          complete: () => {
            this.service.showSnackbar('Role Updated Successfully');
          }
        })
      }
      else {

        if (this.roleData.valid && this.validateMenuAccess()) {
          this.roleService.postRole(this.roleData.getRawValue()).subscribe({
            next: (res) => {
              console.log("success");
              this.roleData.reset();
              this.dialogRef.close(true);
            },
            error: (err) => {
            },
            complete: () => {
              this.service.showSnackbar('Role Saved Successfully');
            }
          })
        }
      }
    } else {

    }

  }

  validateMenuAccess(){
    const menuAccessGroup = this.roleData.get('menuAccess') as FormGroup;
  
    let allFalse = true;
    Object.keys(menuAccessGroup.controls).forEach(controlName => {
      if (menuAccessGroup.get(controlName)?.value) {
        allFalse = false;
      }
    });
  
    if (allFalse) {
      //All properties of menuAccess are false
      this.isMenuAccessValid = false;
      return false;
    } else {
      //At least one property of menuAccess is true
      this.isMenuAccessValid = true;
      return true;
    }
  }
}
