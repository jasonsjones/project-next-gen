import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UtilsModule } from '../utils/utils.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [PrismaModule, UtilsModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
