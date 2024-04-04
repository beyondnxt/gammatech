import { Component } from '@angular/core';
import { CommonService } from 'src/app/providers/core/common.service';
import { ToteboxService } from 'src/app/providers/tote-box/totebox.service';
import * as data from './completed-data';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent {
  isShow = false;
  query: any;
  boxData: any;
  selectedBoxData: any;
  showFrom = false;
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  apiLoader = false;
  items = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];
  selectedItemId: any;
  constructor(private toteboxService:ToteboxService, public service:CommonService) {}
  ngOnInit(){
    this.getCompletedBoxes();
  }
  onSelectionChange(event: any) {
    console.log('Selected item:', event);
  }
  
  getCompletedBoxes(){
    this.apiLoader = true;
    this.toteboxService.getCompletedBoxes(true).subscribe({
      next: (res) => {
        this.apiLoader = false;
        const toteBoxes = (res as any).data;
        this.tableValues = toteBoxes;
      },
      error: (err) => {
      },
      complete(){
      },
    })
  }

  searchBox(barCode: any){
    this.isShow = false;
    this.query='&barcode='+barCode;
    this.toteboxService.getToteBoxes(false, this.query).subscribe({
      next: (res) => {
        const toteBoxes = (res as any).data;
        toteBoxes.from = 'completed';
        this.tableValues = toteBoxes;
        toteBoxes.length == 1 && (this.showFrom=true);
      },
      error: (err) => {
      },
      complete(){
      },
    })
  }

  unLoadToteBox(data: any){
    const transformedValues = {
      unLoading: {
        shiftTime: data.shift
      }
    };
    this.toteboxService.unloadToteBox(transformedValues, data.boxNumber).subscribe({
      next: (res) => {
        this.isShow = false;
        this.service.showSnackbar("Box unLoaded Successfully");
        this.getCompletedBoxes();
      },
      error: (err) => {
      },
      complete(){
      },
    })
  }

  openForm(){
    this.showFrom && (this.isShow=true);
  }

}