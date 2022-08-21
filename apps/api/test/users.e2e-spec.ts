import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from '../src/users/users.service';
import { AuthService } from '../src/auth/auth.service';

describe('UserController (e2e)', () => {
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
        await app.init();
    });

    // seed.ts creates 2 users on initial migration
    describe('/users (GET)', () => {
        it('returns the two seed users', () => {
            return request(app.getHttpServer())
                .get('/users')
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toHaveLength(2);
                });
        });
    });

    describe('/users/me (GET)', () => {
        it('return 401 if bearer token (jwt) is not provided', () => {
            return request(app.getHttpServer())
                .get('/users/me')
                .expect(401)
                .expect(({ body }) => {
                    expect(body).toEqual(
                        expect.objectContaining({
                            statusCode: 401,
                            message: 'Unauthorized'
                        })
                    );
                });
        });

        it('returns the context user when valid access token provided', async () => {
            const oliver = await userService.findByEmail('oliver@qc.com');
            const token = authService.generateAccessToken(oliver);
            return request(app.getHttpServer())
                .get('/users/me')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .expect(({ body }) => {
                    expect(body.user).toEqual(
                        expect.objectContaining({
                            id: expect.any(String),
                            email: 'oliver@qc.com',
                            firstName: 'Oliver',
                            lastName: 'Queen'
                        })
                    );
                });
        });
    });
});
