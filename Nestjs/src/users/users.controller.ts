import {Controller, Get, Param} from '@nestjs/common';
import {MockUsersService} from "./mock-users.service";
import {UserHttpService} from "./user-http.service";

@Controller('users')
export class UsersController {
    constructor(
        private readonly apiService: UserHttpService,
    ) {}

    @Get('user/:id')
    async getUsers(@Param('id') id: string) {
        return this.apiService.getUser(+id);
    }
}
