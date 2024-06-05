import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private webSocket!: Socket;
  constructor() {
    this.connectSocket();
  }

  // this method is used to start connection/handhshake of socket with server
  connectSocket() {
    const authToken = localStorage.getItem('authToken');

    // Use the nullish coalescing operator to provide a default value if authToken is null
    const authorizationHeader = authToken ?? 'empty';
    this.webSocket = io('http://localhost:3000', {
      auth: {
        token: 'test',
      },
      extraHeaders: {
        Authorization: authorizationHeader,
      },
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

  receiveUpdateStatus(): Observable<any> {
    return new Observable((observable) => {
      this.webSocket.emit('get-scanner-data', 'Connect');
      this.webSocket.on('get-scanner-data', (data: any) => {
        observable.next(data);
      });
    });
  }

  receiveScannerLoadUnloadData(): Observable<any> {
    return new Observable((observable) => {
      this.webSocket.emit('get-scanner-load-unload-data', 'Connect');
      this.webSocket.on('get-scanner-load-unload-data', (data: any) => {
        observable.next(data);
      });
    });
  }

  receiveNotificationCount(): Observable<any> {
    return new Observable((observable) => {
      this.webSocket.emit('admin_notification', 'Connect');
      this.webSocket.on('admin_notification', (data: any) => {
        observable.next(data);
        console.log('11----', data);
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
