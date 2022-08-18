import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

function extractCookieValueFromResHeader(header: request.Response['header'], cookieName: string) {
    let value: string;
    const parts = header['set-cookie'][0].split(';');
    const cookie = parts.filter((p: string) => p.includes(cookieName));
    if (cookie.length === 1) {
        value = cookie[0].split('=')[1];
    }
    return value;
}

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST)', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'oliver@qc.com', password: 'test1234' })
            .expect(200)
            .expect(({ body, header }) => {
                const refreshToken = extractCookieValueFromResHeader(header, 'r-token');
                expect(body).toBeTruthy();
                expect(refreshToken.length).toBeGreaterThan(10);
            });
    });
});
