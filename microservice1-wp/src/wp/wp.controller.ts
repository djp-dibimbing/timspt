import { Controller, Post, Body, UseGuards, Get } from "@nestjs/common";
import { WpService } from "./wp.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('wp')
export class WpController {
    constructor(private wpService: WpService) { }

    @Post('register')
    async register(@Body() body: {
        firstname: string, 
        lastname: string,
        email:string,
        username: string,
        password: string,
        nik:string,
        npwp:string
    }) {

        return this.wpService.createWP(body.firstname, body.lastname, body.email, body.username, body.password, body.nik, body.npwp);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile() {
        return { message: 'Authorized User' };
    }
}