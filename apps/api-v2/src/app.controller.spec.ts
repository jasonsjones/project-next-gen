import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService]
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('App Controller', () => {
        it('returns json with message property', () => {
            const reqMock = {} as unknown as Request;
            const resMock = {
                json: jest.fn()
            } as unknown as Response;

            appController.getIndexRoute(reqMock, resMock);

            expect(resMock.json).toBeCalledWith(
                expect.objectContaining({ message: expect.any(String) })
            );
        });
    });
});
