import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { TokensService } from './tokens.service';

import * as bcrypt from 'bcrypt';
import { WebSocketService } from 'src/webSocket/webSocket.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly webSocketService: WebSocketService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findPasswordUsername(username);
    console.log(user);
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('passwordMatch', passwordMatch);
    if (passwordMatch) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };    

    const token = await this.tokensService.findTokenByUserId(user.id);
    if(token){
      this.webSocketService.sendMessage(
          user.id.toString(),
          'Message to user!',
      );

      const tokenExpiryInMs = 1 * 10 * 1000;

      setTimeout(() => {
        this.webSocketService.sendMessage(
            user.id.toString(),
            'Your token expired. Login again',
        );

        this.tokensService.deleteAccessToken(token.access_token);
      }, tokenExpiryInMs);

      return {
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      };
    }

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.tokensService.saveTokens(user.id, accessToken, refreshToken);

    const tokenExpiryInMs = 1 * 10 * 1000;

    console.log('before timeout when login does not exist');
    console.log('userId', user.id.toString())
    setTimeout(() => {
      this.webSocketService.sendMessage(
        user.id.toString(),
        'Your token expired. Login again',
      );

      this.tokensService.deleteAccessToken(accessToken);
    }, tokenExpiryInMs);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async register(username: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.createUser(username, hashedPassword );
    return newUser;
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    const storedToken = await this.tokensService.findRefreshToken(refreshToken);

    if (!storedToken) {
      throw new Error('Refresh token not found');
    }

    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const newAccessToken = this.jwtService.sign(
        { username: decoded.username, sub: decoded.sub },
        { expiresIn: '15m', secret: process.env.JWT_SECRET },
      );

      await this.tokensService.saveTokens(
        decoded.sub,
        newAccessToken,
        refreshToken,
      );

      return { access_token: newAccessToken };
    } catch (err) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  async logout(accessToken: string): Promise<void> {
    await this.tokensService.deleteAccessToken(accessToken);
  }
}
