import { Controller, Get, Res } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AppService } from './app.service';

/*
class IndexResponse {
    @ApiProperty({ description: 'simple message' })
    message: string;
}
*/
@ApiTags('Index')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Gets simple message' })
    getIndexRoute(_: Request, @Res() res: Response) {
        res.json({
            message: this.appService.getIndexMessage()
        });
    }
}
