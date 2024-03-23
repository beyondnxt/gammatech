import { Component } from '@angular/core';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent {

  boxes = [
    { id: 1, name: 'Box 1' },
    { id: 2, name: 'Box 2' },
    { id: 3, name: 'Box 3' },
    { id: 4, name: 'Box 4' },
    { id: 5, name: 'Box 5' },
  ];
  showForm = false;
  selectedBoxData: any;
  openForm(box: any) {
    this.selectedBoxData = box;
    this.showForm = true;
  }

}
