import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [PrismaModule, UsersModule],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
