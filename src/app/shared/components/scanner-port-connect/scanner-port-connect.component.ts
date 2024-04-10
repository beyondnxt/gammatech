import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/providers/core/common.service';
import { SettingService } from 'src/app/providers/setting/setting.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-scanner-port-connect',
  templateUrl: './scanner-port-connect.component.html',
  styleUrls: ['./scanner-port-connect.component.scss']
})
export class ScannerPortConnectComponent {
  scannersData: any;
  transformedData1: { scanner: number, port: string }[] = [];
  scannerData: any;
  constructor(private fb: FormBuilder, private settingService: SettingService, private service: CommonService, public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
  portDetails = this.fb.group({
    scanner1: [''],
    scanner2: [''],
    scanner3: [''],
    scanner4: ['']
  })

  portLiat = [
    { id: 1, name: 'COM1' },
    { id: 2, name: 'COM2' },
    { id: 3, name: 'COM3' },
    { id: 3, name: 'COM4' }
  ];

  ngOnInit() {
    this.getConnectionDetail()
  }

  getConnectionDetail() {
    this.settingService.getConnectionDetail().subscribe({
      next: (res: any) => {
        this.scannerData = res.data;
      },
      error: (err) => {
      },
      complete: () => {
      }
    })
  }

  connectScannerAndPort() {

    this.scannersData = this.portDetails.getRawValue();
    const changedData = this.changeDataFormat(this.scannersData);
    this.settingService.connectPort(changedData).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
        this.service.showSnackbar("Connected Successfully");
      }
    })
  }

  changeDataFormat(scannersData: any) {
    const transformedData = [];

    for (const key in scannersData) {
      if (scannersData.hasOwnProperty(key)) {
        const scannerNumber = +key.replace('scanner', '');
        const port = scannersData[key];
        transformedData.push({ scanner: scannerNumber, port: port });
      }
    }
    return transformedData;
  }

  getStatusColor(status: any) {
    switch (status) {
      case true:
        return 'rgb(77 199 12)';//#FFB100
      default:
        return 'rgb(228, 21, 21)';
    }
  }
}
