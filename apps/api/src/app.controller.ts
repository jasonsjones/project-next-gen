import { Controller, Get, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getIndexRoute(_: Request, @Res() res: Response) {
        return res.json({
            message: this.appService.getIndexMessage()
        });
    }
}
