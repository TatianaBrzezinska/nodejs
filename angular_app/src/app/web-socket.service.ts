import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;
  private messages$: Subject<string> = new Subject();

  connect(userId: string): Observable<string> {
    console.log('Connecting to WebSocket...');
    this.socket = new WebSocket(`ws://localhost:3000?userId=${userId}`);

    this.socket.onmessage = (event) => {
      this.messages$.next(event.data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return this.messages$.asObservable();
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}