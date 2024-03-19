import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { SharedModule } from './shared/modules/shared.module';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { BodyComponent } from './shared/components/body/body.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { UserComponent } from './pages/user/components/users/user.component';
import { AddUserComponent } from './pages/user/components/add-user/add-user.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideNavComponent,
    BodyComponent,
    LayoutComponent,
    UserComponent,
    AddUserComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
