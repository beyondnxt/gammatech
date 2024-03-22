import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/providers/admin/admin.service';
import { CommonService } from 'src/app/providers/core/common.service';

@Component({
  selector: 'app-forget-page',
  templateUrl: './forget-page.component.html',
  styleUrls: ['./forget-page.component.scss']
})
export class ForgetPageComponent {

  constructor(public fb: FormBuilder,private route:ActivatedRoute, private adminService:AdminService, private service:CommonService,private router:Router) {}
  userId!: string;
  forgetPasswordForm = this.fb.group({
    newPassword: ['', [Validators.required]],
    confirmPassword:['', [Validators.required]],
  })

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      console.log('User ID:', this.userId);
    });
  }

  updatePassword(){
    if(this.forgetPasswordForm.valid){
      const formData = this.forgetPasswordForm.getRawValue();
      console.log(formData);
      // const password = formData.confirmPassword;
      if(formData.newPassword == formData.confirmPassword)
      {
        const payload = {password: formData.confirmPassword };
        this.adminService.forgetPassword(this.userId, payload).subscribe({
          next: (res: any) => {
          },
          error: (err: any) => {
    
          },
          complete: () => {
            this.service.showSnackbar('Password Changed Successfully'); 
            this.router.navigate(['login']);
          }
        })
      }
      else{
        this.service.showSnackbar("Password not matching");
      }

    }
    else{
      this.service.showSnackbar("Please Fill All the Required Filelds");
    }
  }
}
