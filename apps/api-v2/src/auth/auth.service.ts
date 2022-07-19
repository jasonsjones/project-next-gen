import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private readonly userService: UsersService) {}

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
        // get access token based on user data...
        const access_token = 'jwt-access-token-goes-here';

        return {
            access_token,
            user
        };
    }
}
