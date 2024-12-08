import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';

@Injectable()
export class WebSocketService {
  private clients = new Map<string, WebSocket>();

  addClient(userId: string, client: WebSocket) {
    this.clients.set(userId, client);
  }

  removeClient(userId: string) {
    this.clients.delete(userId);
  }

  sendMessage(userId: string, message: string) {
    const client = this.clients.get(userId);
    if (client?.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}