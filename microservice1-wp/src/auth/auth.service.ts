import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { WpService } from '../wp/wp.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: WpService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByUsername(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    } else{
      throw new BadRequestException('Invalid credentials provided');
    }
  }

  async login(wp: any) {
    const payload = { email: wp.email, sub: wp.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
}
