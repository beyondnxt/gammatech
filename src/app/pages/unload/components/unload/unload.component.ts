import { Component } from '@angular/core';
import { CommonService } from 'src/app/providers/core/common.service';
import { ToteboxService } from 'src/app/providers/tote-box/totebox.service';
import * as data from './unload-data';

@Component({
  selector: 'app-unload',
  templateUrl: './unload.component.html',
  styleUrls: ['./unload.component.scss']
})
export class UnloadComponent {
  isShow = false;
  query: any;
  selectedBoxData: any;
  lable: any = "Load";
  showFrom = false;
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  constructor(private toteboxService:ToteboxService, private service:CommonService) {}
  ngOnInit(){
    this.getUnloadBoxes();
  }
  getUnloadBoxes(){
    this.query = '';
    this.toteboxService.getToteBoxes(true, this.query).subscribe({
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
    this.toteboxService.getToteBoxes(true, this.query).subscribe({
      next: (res) => {
        const toteBoxes = (res as any).data;
        this.tableValues = toteBoxes;
        toteBoxes.length == 1 && (this.showFrom=true);
      },
      error: (err) => {

      },
      complete(){

      },
    })
  }

  loadToteBox(data: any){
    const transformedValues = {
      barcode: data.boxNumber,
      noOfPass: data.noofPass,
      loading: {
        shiftTime: data.shift
      }
    };
    this.toteboxService.loadToteBox(transformedValues).subscribe({
      next: (res) => {
        this.isShow = false;
        this.service.showSnackbar("Box Loaded Successfully");
        this.getUnloadBoxes();
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
