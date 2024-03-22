import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/providers/admin/admin.service';
import { CommonService } from 'src/app/providers/core/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  constructor(public fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any, private adminService:AdminService,private dialogRef: MatDialogRef<ChangePasswordComponent>, private service:CommonService, public router:Router) {}
  changePassword = this.fb.group({
    email: ['', this.data.mail ? Validators.required : null],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  })

  SendEmail(){
    // console.log('50----', this.changePassword.getRawValue());
    const payload = { email: this.changePassword.getRawValue().email };
    this.adminService.sendMail(payload).subscribe({
      next: (res: any) => {
      },
      error: (err: any) => {

      },
      complete: () => {
        this.dialogRef.close();
        this.service.showSnackbar('Mail Sent Successfully');
      }
    })
  }
  
  updatePassword(){
    if (this.changePassword.valid) {
      const formData = this.changePassword.getRawValue();
      if (formData.newPassword == formData.confirmPassword) {
        const payload = { password: formData.confirmPassword };
        this.adminService.changePassword(payload).subscribe({
          next: (res: any) => {
          },
          error: (err: any) => {
          },
          complete: () => {
            // this.dialogRef.close(data);
            this.dialogRef.close();
            this.service.showSnackbar('Password Changed Successfully');
            this.router.navigate(['login']);
          }
        })
      }
      else {
        this.service.showSnackbar("Password not matching");
      }

    }
    else {
      this.service.showSnackbar("Please Fill All the Required Filelds");
    }
  }
}
