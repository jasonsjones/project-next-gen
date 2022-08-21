import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';

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

    describe('/auth/logout (POST)', () => {
        it('returns simple logout payload', () => {
            return request(app.getHttpServer())
                .post('/auth/logout')
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toEqual(
                        expect.objectContaining({
                            success: true,
                            access_token: null
                        })
                    );
                });
        });
    });

    describe('/auth/token (GET)', () => {
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

        it('sends 403 (forbidden) if refresh token is not provided', () => {
            return request(app.getHttpServer())
                .get('/auth/token')
                .expect(403)
                .expect(({ body, header }) => {
                    const refreshToken = extractCookieValueFromResHeader(header, 'r-token');

                    expect(body.access_token).toBeUndefined();
                    expect(refreshToken).toBeUndefined();
                });
        });

        it('sends 403 (forbidden) if refresh token is expired', async () => {
            const twoHoursAgo = new Date();
            twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
            jest.spyOn(authService, 'verifyRefreshToken').mockImplementation(() => {
                throw new TokenExpiredError('jwt expired', twoHoursAgo);
            });

            const ollie = await userService.findByEmail('oliver@qc.com');
            const expiredRefreshToken = authService.generateRefreshToken(ollie);
            return request(app.getHttpServer())
                .get('/auth/token')
                .set('Cookie', [`r-token=${expiredRefreshToken}`])
                .expect(403)
                .expect(({ body, header }) => {
                    const refreshToken = extractCookieValueFromResHeader(header, 'r-token');

                    expect(body.access_token).toBeUndefined();
                    expect(refreshToken).toBeUndefined();
                    expect(body.message).toBe('jwt expired');
                });
        });

        it('sends 403 (forbidden) if refresh token is otherwise invalid', async () => {
            jest.spyOn(authService, 'verifyRefreshToken').mockImplementation(() => {
                throw new JsonWebTokenError('jwt malformed');
            });
            const ollie = await userService.findByEmail('oliver@qc.com');
            const invalidRefreshToken = authService.generateRefreshToken(ollie);
            return request(app.getHttpServer())
                .get('/auth/token')
                .set('Cookie', [`r-token=${invalidRefreshToken}`])
                .expect(403)
                .expect(({ body, header }) => {
                    const refreshToken = extractCookieValueFromResHeader(header, 'r-token');

                    expect(body.access_token).toBeUndefined();
                    expect(refreshToken).toBeUndefined();
                    expect(body.message).toBe('jwt malformed');
                });
        });
    });
});
