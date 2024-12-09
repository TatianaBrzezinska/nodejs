import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { parse } from 'url';
import { WebSocketService } from './webSocket.service';

@WebSocketGateway() // No need to specify transport, as the adapter is set in main.ts
export class AppWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly webSocketService: WebSocketService) {}

  handleConnection(client: WebSocket, request: any) {
    console.log('New client connection attempt');
    const parameters = parse(request.url, true);
    const userId = parameters.query.userId as string;
    console.log(`Connection parameters: ${JSON.stringify(parameters.query)}`);

    if (userId) {
      this.webSocketService.addClient(userId, client);
      console.log(`Client connected: ${userId}`);

      client.on('close', () => {
        this.webSocketService.removeClient(userId);
        console.log(`Client disconnected: ${userId}`);
      });

      this.webSocketService.sendMessage(userId, 'Hello, user!');

      setTimeout(() => {
        // Wyślij powiadomienie przez WebSocket
        this.webSocketService.sendMessage(
            userId,
            'Your token expired. Login again',
        );
      }, 1 * 10 * 1000);
    } else {
      console.log('Connection rejected: userId not provided');
      client.close();
    }
  }

  handleDisconnect(client: WebSocket) {
    // Optional: Handle disconnections if needed
  }
}