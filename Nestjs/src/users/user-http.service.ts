import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {firstValueFrom} from "rxjs";
@Injectable()
export class UserHttpService {
    constructor(private readonly httpService: HttpService) {}

    async getUser(userID: number): Promise<any> {
        const response = await firstValueFrom(
            this.httpService.get(`http://localhost:3000/api/users/${userID}`, {
                headers: { Authorization: 'SOME TOKEN' },
            })
        );
        return response.data;
    }
}
