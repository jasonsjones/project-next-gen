import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { IncomingHttpHeaders } from 'http';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmailIncludePassword(email);

        if (user && bcrypt.compareSync(password, user.password.hash)) {
            /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
            const { password, ...userInfo } = user;
            return userInfo;
        }

        return null;
    }

    async login(user: Partial<User>) {
        const access_token = this.generateAccessToken(user);

        return {
            access_token,
            user
        };
    }

    async fetchToken(refreshToken: string) {
        if (!refreshToken) {
            throw new ForbiddenException('Refresh token not provided');
        }

        try {
            const decoded = this.verifyRefreshToken(refreshToken);
            const user = await this.userService.findByEmail(decoded.email);
            // TODO: add separate check to verify some other piece of info to
            // ensure the refresh token is valid; e.g. refreshTokenSerial no.
            return {
                refreshToken: this.generateRefreshToken(user),
                responsePayload: {
                    success: true,
                    access_token: this.generateAccessToken(user)
                }
            };
        } catch (err) {
            if (err instanceof Error) {
                throw new ForbiddenException(err.message);
            }
        }
    }

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

    extractTokenFromHeaders(headers: IncomingHttpHeaders): string | undefined {
        let token: string;
        if (headers.authorization) {
            token = headers.authorization.split(' ')[1];
        }
        return token;
    }

    extractTokenFromCookie(cookies: Record<string, string>): string | undefined {
        if (cookies) {
            return cookies['r-token'];
        }
    }

    verifyRefreshToken(token: string) {
        const secret = this.configService.get<string>('REFRESH_TOKEN_SECRET');
        return this.jwtService.verify(token, { secret });
    }
}
