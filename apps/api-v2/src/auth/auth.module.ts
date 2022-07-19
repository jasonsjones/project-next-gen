import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [PrismaModule, UsersModule, PassportModule],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
