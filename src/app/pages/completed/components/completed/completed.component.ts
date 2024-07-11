import { Component, ViewChild } from "@angular/core";
import { CommonService } from "src/app/providers/core/common.service";
import { ToteboxService } from "src/app/providers/tote-box/totebox.service";
import * as data from "./completed-data";
import { MatPaginator } from "@angular/material/paginator";
import { WebSocketService } from "src/app/providers/core/web-socket.service";

@Component({
  selector: "app-completed",
  templateUrl: "./completed.component.html",
  styleUrls: ["./completed.component.scss"],
})
export class CompletedComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isShow = false;
  query: any='';
  boxData: any;
  selectedBoxData: any;
  showFrom = false;
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  apiLoader = false;
  pageCount = 0;
  currentPage = 0;
  totalCount = 0;
  showOrHide = false;
  pageData = {
    pageSize: this.service?.calculatePaginationVal(),
    page: isNaN(this.paginator?.pageIndex) ? 1 : this.paginator?.pageIndex + 1, // 1-based index
  };
  items = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ];
  selectedItemId: any;
  constructor(
    private toteboxService: ToteboxService,
    public service: CommonService,
    private _webSocket: WebSocketService
  ) {}
  ngOnInit() {
    this._webSocket.receiveScannerLoadUnloadData().subscribe({
      next: (res) => {
        if (res.scanner_no == 4) {
          this.searchBox(res.barcode);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getCompletedBoxes();
  }
  onSelectionChange(event: any) {
    console.log("Selected item:", event);
  }

  getCompletedBoxes() {
    this.showOrHide = false;
    this.apiLoader = true;
    this.toteboxService.getCompletedBoxes(true, this.pageData, this.query).subscribe({
      next: (res) => {
        this.apiLoader = false;
        const toteBoxes = (res as any).data;
        !toteBoxes.length && (this.showOrHide = true);
        this.tableValues = toteBoxes;
        // console.log('value---', res);
        toteBoxes.length == 1 && this.query != "" && (this.showFrom = true);
        toteBoxes.from = "completed";
        this.totalCount = (res as any).total;
        this.pageCount = this.pageData.pageSize;
      },
      error: (err) => {},
      complete() {},
    });
  }

  onPageChange(event: any): void {
    this.currentPage = this.paginator.pageIndex;
    this.getCompletedBoxes();
  }

  searchBox(barCode: any) {
    console.log('search bar code', barCode);
    this.isShow = false;
    this.query = "&barcode=" + barCode;
    barCode && this.paginator && (this.paginator.pageIndex = 0);
    this.currentPage = 0; 
    this.getCompletedBoxes();
    // this.toteboxService
    //   .findOneToteBox(false, this.query)
    //   .subscribe({
    //     next: (res) => {
    //       const toteBoxes = (res as any).data;
    //       toteBoxes.from = "completed";
    //       this.tableValues = toteBoxes;
    //       toteBoxes.length == 1 && (this.showFrom = true);
    //     },
    //     error: (err) => {},
    //     complete() {},
    //   });
  }

  unLoadToteBox(data: any) {
    const transformedValues = {
      unLoading: {
        shiftTime: data.shift,
      },
    };
    this.toteboxService
      .unloadToteBox(transformedValues, data.boxNumber)
      .subscribe({
        next: (res) => {
          this.isShow = false;
          this.service.showSnackbar("Box unLoaded Successfully");
          this.getCompletedBoxes();
        },
        error: (err) => {},
        complete() {},
      });
  }

  openForm() {
    this.showFrom && (this.isShow = true);
  }
}
