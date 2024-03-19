import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from './mat-module';
import { HeaderComponent } from '../components/header/header.component';
import { ScannerTableComponent } from '../components/scanner-table/scanner-table.component';
import { LoginComponent } from '../components/login/login.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { BodyComponent } from '../components/body/body.component';
import { SideNavComponent } from '../components/side-nav/side-nav.component';


@NgModule({
    declarations: [
        HeaderComponent,
        ScannerTableComponent,
        LoginComponent,
        LayoutComponent,
        BodyComponent,
        SideNavComponent
    ],
    imports: [
        CommonModule,
        MatModule
    ],
    exports: [
        MatModule,
        HeaderComponent, 
        ScannerTableComponent,
        LoginComponent,
        LayoutComponent,
        BodyComponent,
        SideNavComponent
    ]
})

export class SharedModule { }