import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core'; 
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { TweetModule } from './tweet/tweet.module';
import { AppWebSocketGateway } from './webSocket/webSocket.gateway';
import { WebSocketService } from './webSocket/webSocket.service';


@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, TweetModule],
  providers: [
    AppWebSocketGateway, 
    WebSocketService,    
  ],
})
export class AppModule {}
