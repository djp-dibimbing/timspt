import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { WpService } from '../wp/wp.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: WpService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
    
  }

  async login(wp: any) {
    const user = await this.validateUser(wp.email, wp.password);

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(wp: any) {
    return {
      message: 'Logout success',
    };
  }
  
}
