import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-scanner-table',
  templateUrl: './scanner-table.component.html',
  styleUrls: ['./scanner-table.component.scss']
})
export class ScannerTableComponent {
  
  @Input() tableHeaders: any = [];
  @Input() tableValues: any = [];
  @Output() edit = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  @Output() viewDetail = new EventEmitter();
  @Output() toggleDrawer = new EventEmitter();
  @Output() detail = new EventEmitter;

  ngOnInit(){
  }
  
}
