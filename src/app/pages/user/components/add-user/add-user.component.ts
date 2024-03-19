import { Component, INJECTOR, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  constructor(private fb:FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {}
  userDetails = this.fb.group({});

  addUser(){
    alert("added");
  }
}
