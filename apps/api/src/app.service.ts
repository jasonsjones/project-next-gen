import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getIndexMessage(): string {
        return 'Nestjs REST API';
    }
}
