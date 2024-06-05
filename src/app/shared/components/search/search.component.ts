import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { WebSocketService } from "src/app/providers/core/web-socket.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  constructor(private fb: FormBuilder, private _webSocket: WebSocketService) {}

  ngOnInit(): void {
    this._webSocket.receiveScannerLoadUnloadData().subscribe({
      next: (res) => {
        if (res.scanner_no == 1 || 4) {
          this.setSearchValue(res.barcode);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  @Output() searchData = new EventEmitter();
  search = this.fb.group({
    keyWord: [""],
  });

  setSearchValue(data: any) {
    this.search.patchValue({
      keyWord: data,
    });
  }
}
