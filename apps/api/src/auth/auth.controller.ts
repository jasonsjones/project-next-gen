import { Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
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
        res.cookie('r-token', refreshToken, { httpOnly: true, sameSite: 'none', secure: true });
        // Add additional cookie that can be read by the client to be able to determine
        // the existence of the http only refresh token cookie.
        res.cookie('authd', true, { httpOnly: false, sameSite: 'none', secure: true });
        return res.json(await this.authService.login(req.user));
    }

    @HttpCode(200)
    @Post('/logout')
    logout(@Req() _: Request, @Res() res: Response) {
        res.clearCookie('r-token');
        res.clearCookie('authd');
        return res.json(this.authService.logout());
    }

    @Get('token')
    async fetchToken(@Req() req: Request, @Res() res: Response) {
        const refreshToken = this.authService.extractTokenFromCookie(req.cookies);
        const result = await this.authService.fetchToken(refreshToken);

        if (result.responsePayload.success && result.refreshToken) {
            res.cookie('r-token', result.refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true
            });
        }

        return res.json(result.responsePayload);
    }
}
