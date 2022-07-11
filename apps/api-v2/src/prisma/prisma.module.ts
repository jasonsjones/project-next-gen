import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaTestService } from './prisma-test.service';

const prismaServiceProvider = {
    provide: PrismaService,
    useClass: process.env.NODE_ENV !== 'test' ? PrismaService : PrismaTestService
};

@Module({
    providers: [prismaServiceProvider],
    exports: [PrismaService]
})
export class PrismaModule {}
