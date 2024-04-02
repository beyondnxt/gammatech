import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private fb: FormBuilder) { }
  @Output() searchData = new EventEmitter();
  search = this.fb.group({
    keyWord: [''],
  })
}
