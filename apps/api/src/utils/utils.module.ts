import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthUtilsService } from './auth-utils.service';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret:
                    configService.get<string>('ACCESS_TOKEN_SECRET') ||
                    'defaultSuperSecretStringValue'
            })
        })
    ],
    providers: [AuthUtilsService],
    exports: [AuthUtilsService]
})
export class UtilsModule {}
