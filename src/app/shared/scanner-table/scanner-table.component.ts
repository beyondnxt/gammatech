import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scanner-table',
  templateUrl: './scanner-table.component.html',
  styleUrls: ['./scanner-table.component.scss']
})
export class ScannerTableComponent {

  @Input() tableHeaders: any = [];
  @Input() tableValues: any = [];

  ngOnInit(){
  }
}
