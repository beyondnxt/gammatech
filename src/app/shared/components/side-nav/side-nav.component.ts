import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navBarData } from './nav-data';
import { Subscription } from 'rxjs';
import { RoleService } from 'src/app/providers/role/role.service';

interface sideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  count: any;

  roleId: any = '';
  showMenu: any;
  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  navData = navBarData;
  totalCount: any;
  @HostListener('window:resize', ['$event'])
  onreSize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }
  constructor( private roleService:RoleService
  ) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.roleId = localStorage.getItem('roleId') ? localStorage.getItem('roleId') : '';
    this.roleId && this.getRoleInfo();
  }


  getRoleInfo() {
    this.roleService.getRoleById(this.roleId).subscribe({
      next: (res) => {
        console.log('46-----', res);
        this.showMenu = res?.menuAccess;
      },
      error: (err: any) => {
        return;
      },
      complete: () => {
      }
    });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
  closeSideNav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
}
