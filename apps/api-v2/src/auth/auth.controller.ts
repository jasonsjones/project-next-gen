import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post('/login')
    async login(@Req() req: Request) {
        return req.user;
    }
}
