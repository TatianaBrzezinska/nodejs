import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from '../services/tokens.service';
import { WebSocketService } from 'src/webSocket/webSocket.service';

@Injectable()
export class JwtAuthGuard {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokensService: TokensService,
    private readonly webSocketService: WebSocketService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.split(' ')[1];
      return this.validateAccessToken(accessToken, request);
    }

    const refreshToken =
      request.body.refresh_token || request.query.refresh_token;

    if (!refreshToken) {
      this.notifyInvalidToken(request);
      throw new UnauthorizedException('Missing tokens');
    }

    return this.validateRefreshToken(refreshToken, request);
  }

  private async validateAccessToken(
    token: string,
    request: any,
  ): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const storedToken = await this.tokensService.findAccessToken(token);

      if (!storedToken) {
        this.notifyInvalidToken(request);
        throw new UnauthorizedException('Access token not found in database');
      }

      request.user = decoded;
      return true;
    } catch (err) {
      this.notifyInvalidToken(request);
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  private async validateRefreshToken(
    token: string,
    request: any,
  ): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const storedToken = await this.tokensService.findRefreshToken(token);

      if (!storedToken) {
        throw new UnauthorizedException('Refresh token not found in database');
      }

      const newAccessToken = this.jwtService.sign(
        { username: decoded.username, sub: decoded.sub },
        { expiresIn: '15m', secret: process.env.JWT_SECRET },
      );

      await this.tokensService.saveTokens(decoded.sub, newAccessToken, token);

      request.user = decoded;
      request.newAccessToken = newAccessToken;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private notifyInvalidToken(request: any) {
    const userId = request.query.userId;
    if (userId) {
      this.webSocketService.sendMessage(userId, 'Your session has expired. Please log in again.');
    }
  }
}
