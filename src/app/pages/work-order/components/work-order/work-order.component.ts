import { Component } from '@angular/core';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent {

  
  constructor(private socket:WebSocket) {
    // this.socket = new WebSocket('ws://example.com/socket');

    // this.socket.onopen = (event) => {
    //   console.log('WebSocket connection established');
    // };

    // this.socket.onmessage = (event) => {
    //   console.log('Message received:', event.data);
    //   // Handle incoming messages here
    // };

    // this.socket.onclose = (event) => {
    //   console.log('WebSocket connection closed');
    // };

    // this.socket.onerror = (event) => {
    //   console.error('WebSocket error:', event);
    // };
  }

  // sendData(data: any) {
  //   if (this.socket.readyState === WebSocket.OPEN) {
  //     this.socket.send(JSON.stringify(data));
  //   } else {
  //     console.error('WebSocket connection is not open');
  //   }
  // }

}
