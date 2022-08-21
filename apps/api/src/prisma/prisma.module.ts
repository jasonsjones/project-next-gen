import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaTestService } from './prisma-test.service';
import { ConfigModule } from '@nestjs/config';

const prismaServiceProvider = {
    provide: PrismaService,
    useClass: process.env.NODE_ENV !== 'test' ? PrismaService : PrismaTestService
};

@Module({
    imports: [ConfigModule],
    providers: [prismaServiceProvider],
    exports: [PrismaService]
})
export class PrismaModule {}
