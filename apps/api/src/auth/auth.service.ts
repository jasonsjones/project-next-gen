import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtServcie: JwtService
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

    generateAccessToken(user: Partial<User>): string {
        const payload = { sub: user.id, email: user.email };
        return this.jwtServcie.sign(payload, { expiresIn: '10m' });
    }
}
