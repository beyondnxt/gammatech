import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent {
  isMenuAccessValid: boolean = true;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any) {}
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

  ngOnInit(){
    if(this.dialogData){
      let data = {
        "name": this.dialogData.name,
        "description": this.dialogData.description,
        "menuAccess":{
          "dashboard": this.dialogData.dashboard,
          "user": this.dialogData.user,
          "inventory": this.dialogData.inventory,
          "inward": this.dialogData.inward,
          "company": this.dialogData.company,
          "role": this.dialogData.role,
          "product": this.dialogData.product,
          "dispatch": this.dialogData.dispatch,
        }
      }; 
      this.roleData.patchValue(data);
    }
  }

  addRole(){
    
  }
}
