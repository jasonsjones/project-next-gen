import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaTestService extends PrismaService {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_TEST_URL
                }
            }
        });
    }
}
