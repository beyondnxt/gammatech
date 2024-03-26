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
import { SearchComponent } from '../components/search/search.component';
import { AddBtnComponent } from '../components/add-btn/add-btn.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { ForgetPageComponent } from '../components/forget-page/forget-page.component';
import { ShowDetailComponent } from '../components/show-detail/show-detail.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        AddBtnComponent,
        ChangePasswordComponent,
        ConfirmDialogComponent,
        ForgetPageComponent,
        HeaderComponent,
        ScannerTableComponent,
        LoginComponent,
        LayoutComponent,
        BodyComponent,
        SideNavComponent,
        SearchComponent,
        FormDataComponent,
        ShowDetailComponent
    ],
    imports: [
        CommonModule,
        MatModule,
        RouterModule
    ],
    exports: [
        MatModule,
        AddBtnComponent,
        ChangePasswordComponent,
        ConfirmDialogComponent,
        ForgetPageComponent,
        HeaderComponent,
        ScannerTableComponent,
        LoginComponent,
        LayoutComponent,
        BodyComponent,
        SideNavComponent,
        SearchComponent,
        FormDataComponent,
        ShowDetailComponent
    ]
})

export class SharedModule { }