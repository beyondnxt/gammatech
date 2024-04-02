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
  @Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();
  changedValue: any = [];

  ngOnInit() {
  }

  selectAllValues(event: any) {
    // this.changedValue = [];
    this.tableValues.forEach((obj: any) => {

      obj.checked = event.checked ? true : false;
      this.onEditChange(obj.noOfPass, obj.id);
    });
    const idArray = this.tableValues.map((item: any) => item.id);
    this.checkBoxes.emit(idArray);
  }

  onCheckboxChange(event: any, key: string, ids: string) {
    const index = this.tableValues.findIndex((item: any) => item.id === ids);
    if (index !== -1) {
      this.tableValues[index].checked = !this.tableValues[index].checked;
    }
    this.emitIds.emit(ids);
    this.onEditChange(key, ids);
  }

  onEditChange(key: string, ids: string) {
    const index1 = this.changedValue.findIndex((item: any) => item.id === ids);
    if (index1 === -1) {                
    const foundItem = this.tableValues.find((item: any) => item.id === ids);
    this.changedValue.push({
      id: ids,
      noOfPass: foundItem.noOfPass
    });

    }else{
      this.changedValue.splice(index1, 1);
    }

    this.valueChanged.emit(this.changedValue);
    console.log('Changed values:', this.changedValue);
  }

  onSpanInput(event: any, key: string, id: number) {

    const index = this.changedValue.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      this.changedValue.splice(index, 1);
    }

      this.changedValue.push({
        id: id,
        noOfPass: event.target.textContent
      });
      this.valueChanged.emit(this.changedValue);
      console.log('Changed values:', this.changedValue);
  }

}
