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
    noofPass:[3],
    shift:[this.getShift()],
  })

  ngOnInit(){
    this.from = this.data.from;
    this.data =  this.data[0];
  }
  getShift(): string {
    const currentTime = new Date();
    const hour = currentTime.getHours();
  
    if (hour >= 6 && hour < 14) {
      return 'Morning Shift(6AM to 2PM)';
    } else if (hour >= 14 && hour < 22) {
      return 'Afternoon Shift(2PM to 10PM)';
    } else {
      return 'Night Shift(10PM to 6AM)';
    }
  }
  onSubmit(){
    let formData = this.formData.getRawValue();
    if(formData.shift == 'Morning Shift(6AM to 2PM)'){
      formData.shift = 'AM';
    }
    else if(formData.shift == 'Afternoon Shift(2PM to 10PM)'){
      formData.shift = 'FN';
    }
    else{
      formData.shift = 'PM';
    }
    this.loadToteBox.emit(formData);
  }

}
