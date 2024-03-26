import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from './mat-module';
import { HeaderComponent } from '../components/header/header.component';
import { ScannerTableComponent } from '../components/scanner-table/scanner-table.component';
import { LoginComponent } from '../components/login/login.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { BodyComponent } from '../components/body/body.component';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { FormDataComponent } from '../components/form-data/form-data.component';
import { AddBtnComponent } from '../components/add-btn/add-btn.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { ForgetPageComponent } from '../components/forget-page/forget-page.component';
import { ShowDetailComponent } from '../components/show-detail/show-detail.component';


@NgModule({
    declarations: [
        HeaderComponent,
        ScannerTableComponent,
        LoginComponent,
        LayoutComponent,
        BodyComponent,
        SideNavComponent,
        FormDataComponent,
        AddBtnComponent,
        ChangePasswordComponent,
        ConfirmDialogComponent,
        ForgetPageComponent,
        ShowDetailComponent
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
        SideNavComponent,
        FormDataComponent,
        AddBtnComponent,
        ChangePasswordComponent,
        ConfirmDialogComponent,
        ForgetPageComponent,
        ShowDetailComponent
    ]
})

export class SharedModule { }