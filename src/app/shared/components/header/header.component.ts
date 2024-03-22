import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public router:Router,private dialog: MatDialog) {}
  @Input() collapsed = true;
  @Input() screenWidth = 0;
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

}
