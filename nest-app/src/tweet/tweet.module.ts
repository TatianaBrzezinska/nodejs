import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { WebSocketService } from 'src/webSocket/webSocket.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
    }),
    AuthModule,
  ],
  controllers: [TweetController],
  providers: [TweetService, WebSocketService],
})
export class TweetModule {}
