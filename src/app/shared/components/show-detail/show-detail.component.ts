import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss']
})
export class ShowDetailComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(){
    // console.log('data-----',this.data);
  }
}
