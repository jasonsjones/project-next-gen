import { Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('/login')
    async login(@Req() req: Request, @Res() res: Response) {
        const refreshToken = this.authService.generateRefreshToken(req.user);
        res.cookie('rtid', refreshToken, { httpOnly: true, sameSite: 'none', secure: true });
        return res.json(await this.authService.login(req.user));
    }
}
