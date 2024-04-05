import { Component, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/providers/core/common.service';
import { ToteboxService } from 'src/app/providers/tote-box/totebox.service';
import * as data from './unload-data';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-unload',
  templateUrl: './unload.component.html',
  styleUrls: ['./unload.component.scss']
})
export class UnloadComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isShow = false;
  query = '';
  // query: any;
  selectedBoxData: any;
  lable: any = "Load";
  showFrom = false;
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  apiLoader = false;
  pageCount = 0;
  currentPage = 0;
  totalCount = 0;
  constructor(private toteboxService:ToteboxService, public service:CommonService) {}
  ngOnInit(){
    this.getUnloadBoxes();
  }
  getUnloadBoxes(){
    this.apiLoader = true;

    const pageData = {
      pageSize: this.service?.calculatePaginationVal(),
      page: isNaN(this.paginator?.pageIndex) ? 1 : this.paginator?.pageIndex + 1 // 1-based index
    }
    this.toteboxService.getToteBoxes(true, this.query, pageData).subscribe({
      next: (res) => {
        this.apiLoader = false;
        const toteBoxes = (res as any).data;
        this.tableValues = toteBoxes;
        (toteBoxes.length == 1 && this.query != '') && (this.showFrom=true);
        this.totalCount = (res as any).fetchedCount;
        this.pageCount = pageData.pageSize;
      },
      error: (err) => {

      },
      complete(){

      },
    })
  }

  onPageChange(event: any): void {
    this.currentPage = this.paginator.pageIndex;
    this.getUnloadBoxes();
  }

  searchBox(barCode: any){
    this.isShow = false;
    this.query='&barcode='+barCode;
    (barCode && this.paginator) && (this.paginator.pageIndex = 0);
    this.currentPage = 0;
    this.getUnloadBoxes();
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
    console.log("hiii");
    console.log(this.showFrom);
    this.showFrom && (this.isShow=true);
  }
}
