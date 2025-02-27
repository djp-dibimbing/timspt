import { Controller, Post, Body, UseGuards, Get, Req, NotFoundException, Put } from "@nestjs/common";
import { WpService } from "./wp.service";
import { AuthGuard } from "@nestjs/passport";
import * as bcrypt from 'bcryptjs';

@Controller('wp')
export class WpController {
    constructor(private wpService: WpService) { }

    @Post('register')
    async register(@Body() body: {
        firstname: string,
        lastname: string,
        email: string,
        username: string,
        password: string,
        nik: string,
        npwp: string
    }) {

        return this.wpService.createWP(body.firstname, body.lastname, body.email, body.username, body.password, body.nik, body.npwp);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@Req() req) {
        const user = await this.wpService.findByEmail(req.user.email);
        if (!user) {
            throw new NotFoundException('WP not found');
        }
        return {
            message: 'Authorized User', data: user
        };
    }

    // PUT Update Profile
    @UseGuards(AuthGuard('jwt'))
    @Put('update-profile')
    async updateProfile(@Req() req, @Body() updateData) {
        const { firstname, lastname, email, username, password, nik, npwp } = updateData;

        const updateFields: any = {
            firstname,
            lastname,
            email,
            username,
            nik,
            npwp
        };

        if (password && password.trim() !== '') {
            updateFields.password = await bcrypt.hash(password, 10);
        }

        const updatedData = await this.wpService.updateWP(req.user.id, updateFields);

        return { message: 'Profile updated!', data: updatedData };
    }
}