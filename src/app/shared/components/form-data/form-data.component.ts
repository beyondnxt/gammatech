import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserHelper } from 'src/app/pages/user/components/users/user.helper';
import { UserService } from 'src/app/providers/user/user.service';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent {
  @Input() data: any;
  users: any;
  constructor(private fb:FormBuilder, private userService:UserService, private userHelper:UserHelper) {}

  formData=this.fb.group({
    boxNumber:[''],
    noofPass:[''],
    userName:[''],
    shift:[],
  })

  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = this.userHelper.mapUserData(res.data);
      },
      error: (err) => {

      },
      complete(){

      },
    })
  }

  LoadBox(){
    
  }
}
