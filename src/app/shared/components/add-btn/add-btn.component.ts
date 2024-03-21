import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-btn',
  templateUrl: './add-btn.component.html',
  styleUrls: ['./add-btn.component.scss']
})
export class AddBtnComponent {

  @Input() label = '';
  @Output() action = new EventEmitter();
  
}
