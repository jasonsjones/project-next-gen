import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthUtilsService {
    constructor(private configService: ConfigService, private jwtService: JwtService) {}

    generateAccessToken(user: Partial<User>): string {
        const payload = { sub: user.id, email: user.email };
        return this.jwtService.sign(payload, { expiresIn: '10m' });
    }

    generateRefreshToken(user: Partial<User>): string {
        const secret = this.configService.get<string>('REFRESH_TOKEN_SECRET');
        // TODO: add another piece of info to the payload; e.g. refreshTokenSerial no.
        const payload = { sub: user.id, email: user.email };
        return this.jwtService.sign(payload, { secret, expiresIn: '14d' });
    }

    verifyRefreshToken(token: string) {
        const secret = this.configService.get<string>('REFRESH_TOKEN_SECRET');
        return this.jwtService.verify(token, { secret });
    }
}
