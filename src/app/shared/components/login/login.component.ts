import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/providers/admin/admin.service';
import { CommonService } from 'src/app/providers/core/common.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private fb: FormBuilder,private dialog: MatDialog,private adminService:AdminService, public router: Router, public service: CommonService){}
  loginForm = this.fb.group({
    email: ['jisha@gmail.com', [Validators.required, Validators.email]],
    password: ['jisha', [Validators.required]]
  })

  userlLogin(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid){
      this.service.showSnackbar("UserName and Password is Required");
    }else{
      const payload = this.loginForm.getRawValue();
      this.adminService.login(payload).subscribe({
        next: (res) => {
          this.setLocalStorage(res);
        },
        error: (err) => {
          console.log(err);
          this.service.showSnackbar(err.error.message);
        },
        complete: () => {
          this.service.showSnackbar("Loggedin Successfully");
        }
      })
    }
  }

  setLocalStorage(res: any){
    console.log(res);
    localStorage.setItem('userId', res?.userId);
    localStorage.setItem('authToken', res?.token);
    localStorage.setItem('roleId', res?.roleId);
    res?.roleId && this.router.navigate(['dashboards']);
  }

  forgetPassword(){
    this.dialog.open(ChangePasswordComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'inward-dialog-container',
      data:{mail:true},
    }).afterClosed().subscribe((res) => {

    });
  }
}
