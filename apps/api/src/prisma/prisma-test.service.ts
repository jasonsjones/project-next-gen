import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaTestService extends PrismaService {
    constructor(configService: ConfigService) {
        super({
            datasources: {
                db: {
                    url: configService.get<string>('DATABASE_TEST_URL')
                }
            }
        });
    }
}
