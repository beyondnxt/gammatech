import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { WebSocketService } from 'src/app/providers/core/web-socket.service';
import { ToteboxService } from 'src/app/providers/tote-box/totebox.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: string | null | undefined;
  notifyCount: any;
  constructor(public router:Router,private dialog: MatDialog, private websocketService:WebSocketService, private toteBoxService:ToteboxService) {}
  @Input() collapsed = true;
  @Input() screenWidth = 0;

  ngOnInit(){
    this.userName = localStorage.getItem('name');
    this.getNotifyCount();
    this.getNotificationCount();
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
      width: '800px',
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
  redirectToApprovalPage(){
    this.router.navigate(['/notification']);
  }

}
