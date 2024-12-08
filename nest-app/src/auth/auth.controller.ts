import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    if (!user) {
      throw new UnauthorizedException('Unauthorized access');
    }

    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() body: { refresh_token: string }) {
    const token = await this.authService.refreshAccessToken(body.refresh_token);

    if (!token) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return token;
  }
  
  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const newUser = await this.authService.register(body.username, body.password);
    return newUser;
  }
}
