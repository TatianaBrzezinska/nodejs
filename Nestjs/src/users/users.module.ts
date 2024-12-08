import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import {HttpModule, HttpService} from "@nestjs/axios";
import { MockUsersService } from './mock-users.service';
import {UserHttpService} from "./user-http.service";

@Module({
  controllers: [UsersController],
  providers: [UserHttpService],
  imports: [HttpModule]
})
export class UsersModule {}
