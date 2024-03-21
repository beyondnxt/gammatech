import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/providers/admin/admin.service';
import { CommonService } from 'src/app/providers/core/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private fb: FormBuilder,private adminService:AdminService, public router: Router, public service: CommonService){}
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  userlLogin(){
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
}
