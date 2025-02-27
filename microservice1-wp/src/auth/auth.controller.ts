import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log('env', process.env.JWT_SECRET);
    return this.authService.login(body);
  }

  @Post('logout')
  async logout(@Body() body: { email: string }) {
    return this.authService.logout(body);
  }
}
