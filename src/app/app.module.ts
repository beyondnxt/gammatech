import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { SharedModule } from './shared/modules/shared.module';
import { UserComponent } from './pages/user/components/users/user.component';
import { AddUserComponent } from './pages/user/components/add-user/add-user.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonService } from './providers/core/common.service';
import { HttpInterceptorService } from './providers/httpinterceptor/http-interceptor.service';
import { AddBtnComponent } from './shared/components/add-btn/add-btn.component';
import { RolesComponent } from './pages/roles/components/roles/roles.component';
import { AddRolesComponent } from './pages/roles/components/add-roles/add-roles.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    AddUserComponent,
    ConfirmDialogComponent,
    AddBtnComponent,
    RolesComponent,
    AddRolesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
