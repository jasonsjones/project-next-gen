import cookieParser from 'cookie-parser';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import { AuthService } from '../src/auth/auth.service';

function extractCookieValueFromResHeader(header: request.Response['header'], cookieName: string) {
    let value: string;
    if (header && header['set-cookie']?.length > 0) {
        const parts = header['set-cookie'][0].split(';');
        const cookie = parts.filter((p: string) => p.includes(cookieName));
        if (cookie.length === 1) {
            value = cookie[0].split('=')[1];
        }
    }
    return value;
}

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let userService: UsersService;
    let authService: AuthService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        userService = moduleFixture.get<UsersService>(UsersService);
        authService = moduleFixture.get<AuthService>(AuthService);
        app = moduleFixture.createNestApplication();
        app.use(cookieParser());
        await app.init();
    });

    describe('/auth/login (POST)', () => {
        it('authenticates a valid user', () => {
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

        it('sends a 401 for an invalid email', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({ email: 'unknown-user@test.com', password: 'test1234' })
                .expect(401)
                .expect(({ body }) => {
                    expect(body.statusCode).toEqual(401);
                    expect(body.message).toBe('Unauthorized');
                });
        });

        it('sends a 401 for an invalid password', () => {
            return request(app.getHttpServer())
                .post('/auth/login')
                .send({ email: 'oliver@qc.com', password: 'invalidPwd' })
                .expect(401)
                .expect(({ body }) => {
                    expect(body.statusCode).toEqual(401);
                    expect(body.message).toBe('Unauthorized');
                });
        });
    });

    describe('/auth/token (GET)', () => {
        it('does not return access token if refresh token is not provided', () => {
            return request(app.getHttpServer())
                .get('/auth/token')
                .expect(200)
                .expect(({ body, header }) => {
                    const refreshToken = extractCookieValueFromResHeader(header, 'r-token');

                    expect(body.success).toBe(false);
                    expect(body.access_token).toBeNull();
                    expect(refreshToken).toBeUndefined();
                });
        });

        it('returns access token when sent a valid refresh token', async () => {
            const ollie = await userService.findByEmail('oliver@qc.com');
            const validRefreshToken = authService.generateRefreshToken(ollie);

            return request(app.getHttpServer())
                .get('/auth/token')
                .set('Cookie', [`r-token=${validRefreshToken}`])
                .expect(200)
                .expect(({ body, header }) => {
                    const refreshToken = extractCookieValueFromResHeader(header, 'r-token');

                    expect(body.success).toBe(true);
                    expect(body.access_token).toBeTruthy();
                    expect(refreshToken).toBeTruthy();
                    expect(refreshToken.length).toBeGreaterThan(10);
                });
        });
    });
});
