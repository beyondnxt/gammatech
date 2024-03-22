import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/providers/core/common.service';
import { ToteboxService } from 'src/app/providers/tote-box/totebox.service';

@Component({
  selector: 'app-add-tote-box',
  templateUrl: './add-tote-box.component.html',
  styleUrls: ['./add-tote-box.component.scss']
})
export class AddToteBoxComponent {

  constructor(private fb: FormBuilder, private toteBoxService: ToteboxService, public dialogRef: MatDialogRef<AddToteBoxComponent>,private service: CommonService,@Inject(MAT_DIALOG_DATA) public data: any) { }
  toteBoxDetails = this.fb.group({
    toteBoxName: ['', [Validators.required]],
    barcode: ['', [Validators.required]],
  })

  ngOnInit(){
    if (this.data) {
      this.toteBoxDetails.patchValue(this.data)
    }
  }

  addNewBox() {
    this.toteBoxDetails.markAllAsTouched();
    if (this.toteBoxDetails.valid) {
      if (this.data) {
        let formValue: any = this.toteBoxDetails.getRawValue();

        this.toteBoxService.updateBox(this.data?.id, formValue).subscribe({
          next: (res) => {
            this.toteBoxDetails.reset();
            this.dialogRef.close(true);
          },
          error: (err) => {
          },
          complete: () => {
            this.service.showSnackbar('User Updated Successfully');
          }
        })
      }
      else {
        this.toteBoxService.postBox(this.toteBoxDetails.getRawValue()).subscribe({
          next: (res) => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.service.showSnackbar(err.error.message);
          },
          complete: () => {
            this.service.showSnackbar('User Created Successfully');
          }
        })
      }

    } else {
      this.service.showSnackbar('Please fill all the required fields');
    }
  }
}
