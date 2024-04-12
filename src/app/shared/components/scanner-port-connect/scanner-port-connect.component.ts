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
  count = 0;
  constructor(private fb: FormBuilder, private settingService: SettingService, private service: CommonService, public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
  portDetails = this.fb.group({
    scanner1: [''],
    scanner2: [''],
    scanner3: [''],
    scanner4: ['']
  })
  selectedPorts: Set<string> = new Set();
  portList: string[] = ['com1', 'com2', 'com3', 'com4'];
  // portList: any

  ngOnInit() {
    this.getConnectionDetail();
    // this.getAvailablePorts();

    this.portDetails.valueChanges.subscribe(() => {
      this.updateSelectedPorts();
    });

  }

  updateSelectedPorts() {
    this.selectedPorts.clear(); // Clear the set of selected ports

    for (let key in this.portDetails.controls) {
      if (this.portDetails.controls.hasOwnProperty(key)) {
        const port = this.portDetails.get(key)?.value;
        if (port) {
          this.selectedPorts.add(port);
        }
      }
    }
  }

  getAvailablePort(scannerKey: string): string[] {
    const currentPort = this.portDetails.get(scannerKey)?.value;
    if (!currentPort) {
      return this.portList.filter(port => !this.selectedPorts.has(port));
    } else {
      // Filter out already selected ports except for the current port selection
      return this.portList.filter(port => port === currentPort || !this.selectedPorts.has(port));
    }
  }

  getAvailablePorts(){
    this.settingService.getAvailablePorts().subscribe({
      next: (res: any) => {
        this.portList = res;
      },
      error: (err) => {
      },
      complete: () => {
      }
    })
  }

  getConnectionDetail() {
    this.settingService.getConnectionDetail().subscribe({
      next: (res: any) => {
        this.scannerData = res.data;  
        this.count = this.scannerData.length;
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
