import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() lable: any;
  @Output() loadToteBox = new EventEmitter();
  users: any;
  from: any;
  constructor(private fb:FormBuilder, private userService:UserService, private userHelper:UserHelper) {}

  formData=this.fb.group({
    boxNumber:[''],
    noofPass:[''],
    shift:[],
  })

  ngOnInit(){
    this.from = this.data.from;
    this.data =  this.data[0];
    console.log(this.from);
  }
  onSubmit(){
    const formDataValues = this.formData.getRawValue();
    this.loadToteBox.emit(formDataValues);
  }

}
