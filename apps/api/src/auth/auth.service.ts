import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { IncomingHttpHeaders } from 'http';
import { UsersService } from '../users/users.service';
import { AuthUtilsService } from '../utils/auth-utils.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly authUtilsService: AuthUtilsService,
        private readonly userService: UsersService
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
        const access_token = this.authUtilsService.generateAccessToken(user);

        return {
            access_token,
            user
        };
    }

    logout() {
        return {
            success: true,
            access_token: null
        };
    }

    async fetchToken(refreshToken: string) {
        if (!refreshToken) {
            throw new ForbiddenException('Refresh token not provided');
        }

        try {
            const decoded = this.authUtilsService.verifyRefreshToken(refreshToken);
            const user = await this.userService.findByEmail(decoded.email);
            // TODO: add separate check to verify some other piece of info to
            // ensure the refresh token is valid; e.g. refreshTokenSerial no.
            return {
                refreshToken: this.authUtilsService.generateRefreshToken(user),
                responsePayload: {
                    success: true,
                    access_token: this.authUtilsService.generateAccessToken(user)
                }
            };
        } catch (err) {
            if (err instanceof Error) {
                throw new ForbiddenException(err.message);
            }
        }
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
}
