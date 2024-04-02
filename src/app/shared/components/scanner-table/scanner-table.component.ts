import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-scanner-table',
  templateUrl: './scanner-table.component.html',
  styleUrls: ['./scanner-table.component.scss']
})
export class ScannerTableComponent {
  
  @Input() tableHeaders: any = [];
  @Input() tableValues: any = [];
  isSelectAll: boolean = false;
  @Output() edit = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  @Output() viewDetail = new EventEmitter();
  @Output() toggleDrawer = new EventEmitter();
  @Output() detail = new EventEmitter;
  @Output() checkBoxes = new EventEmitter();
  @Output() emitIds = new EventEmitter();

  ngOnInit(){
  }
  
  selectAllValues(event:any){
    this.tableValues.forEach((obj: any) => {
      obj.checked = event.checked ? true : false;
    });
    const idArray = this.tableValues.map((item: any) => item.id);
    this.checkBoxes.emit(idArray);
  }

  onCheckboxChange(event:any,ids:string){
    const index = this.tableValues.findIndex((item:any) => item.id === ids);
    if (index !== -1) {
      this.tableValues[index].checked = !this.tableValues[index].checked;
    }
    this.emitIds.emit(ids);
  }

}
