import { Injectable } from '@nestjs/common';

export class MockUsersService {
    async getUser(userID: number): Promise<any> {
        return new Promise((res) => {
            res(
                {user: userID, name: 'John'}
            )
        })
    }
}
