import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private webSocket!: Socket;
  constructor() {
   this. connectSocket();
   }

   // this method is used to start connection/handhshake of socket with server
  connectSocket() {
    this.webSocket = io('http://localhost:3000', {
      // auth: {
      //   token: tokenGetter(),
      // },
      // extraHeaders: {
      //   Authorization: tokenGetter(),
      // },
    });
    
  }

  receiveStatus(): Observable<any> {
    return new Observable((observable) => {
      this.webSocket.emit('get-message', 'Connect');
     this.webSocket.on('get-message', (data: any) => {
        observable.next(data);
      });
    });
  }


  getUsers(): Observable<any> {
    return new Observable((observable) => {
      this.webSocket.emit('get-message', 'Connect');
     this.webSocket.on('get-message', (data: any) => {
        observable.next(data);
      });
    });
  }

  // this method is used to end web socket connection
  disconnectSocket() {
    this.webSocket.disconnect();
  }
}
