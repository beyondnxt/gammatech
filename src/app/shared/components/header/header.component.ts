import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { WebSocketService } from 'src/app/providers/core/web-socket.service';
import { ToteboxService } from 'src/app/providers/tote-box/totebox.service';
import { ScannerPortConnectComponent } from '../scanner-port-connect/scanner-port-connect.component';
import { SettingService } from 'src/app/providers/setting/setting.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: string | null | undefined;
  notifyCount: any;
  scannerData: any;
  scanner1 = false;
  scanner2 = false;
  scanner3 = false;
  scanner4 = false;
  constructor(public router:Router,private dialog: MatDialog, private websocketService:WebSocketService, private toteBoxService:ToteboxService, private settingService:SettingService) {}
  @Input() collapsed = true;
  @Input() screenWidth = 0;

  ngOnInit(){
    this.userName = localStorage.getItem('name');
    this.getNotifyCount();
    this.getNotificationCount();
    this.getScannerConnection();
  }

  getNotifyCount(){
    this.toteBoxService.getNotifyCount().subscribe(
      {
        next: (res: any) => {
          this.notifyCount = res.count;
        },
        error: (err) => {
          console.log(err);
         },
        complete: () => {
       }
      }
    );
  }

  getNotificationCount(){
    this.websocketService.receiveNotificationCount().subscribe(
      {
        next: (res) => {
          this.getNotifyCount();
        },
        error: (err) => {
          console.log(err);
         },
        complete: () => {
       }
      }
    );
  }
  getHeaderClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen'
    }
    return styleClass
  }

  logOut(){
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    localStorage.removeItem('roleId');
    localStorage.removeItem('name');
    this.router.navigate(['login']);
  }
  changePassword(){
    this.dialog.open(ChangePasswordComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      data:{changePwd:true},
      panelClass: 'inward-dialog-container',
    }).afterClosed().subscribe((res) => {
      if (res) {
        // this.getInventory();
      }
    });
  }
  connectScannerAndPort(){
    this.dialog.open(ScannerPortConnectComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      data:{changePwd:true},
      panelClass: 'inward-dialog-container',
    }).afterClosed().subscribe((res) => {
      if (res) {

      }
    });
  }

  getScannerConnection(){
    console.log("hiiii");
    this.settingService.getConnectionDetail().subscribe({
      next: (res: any) => {
        this.scannerData = res.data;
        if(this.scannerData.length > 0){
        this.scanner1 = this.scannerData[0]['status'];
        this.scanner2 = this.scannerData[1]['status'];
        this.scanner3 = this.scannerData[2]['status'];
        this.scanner4 = this.scannerData[3]['status'];
        }
      },
      error: (err) => {
      },
      complete: () => {
      }
    })
  }

  redirectToApprovalPage(){
    this.router.navigate(['/notification']);
  }

  getStatusColor(status: any) {
    console.log('status', status);
    // switch (status) {
    //   case true:
    //     return 'rgb(77 199 12)';//#FFB100
    //   default:
    //     return 'rgb(228, 21, 21)';
    // }
  }


}
