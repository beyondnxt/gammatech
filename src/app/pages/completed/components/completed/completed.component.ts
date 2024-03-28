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
  
  constructor(private toteboxService:ToteboxService, private service:CommonService) {}
  ngOnInit(){
    this.getCompletedBoxes();
  }
  getCompletedBoxes(){
    this.toteboxService.getCompletedBoxes(true).subscribe({
      next: (res) => {
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