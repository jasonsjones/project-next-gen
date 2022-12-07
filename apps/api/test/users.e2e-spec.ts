import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { UsersService } from '../src/users/users.service';
import { AuthUtilsService } from '../src/utils/auth-utils.service';
import { AppModule } from './../src/app.module';

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let userService: UsersService;
    let authUtilsService: AuthUtilsService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        userService = moduleFixture.get<UsersService>(UsersService);
        authUtilsService = moduleFixture.get<AuthUtilsService>(AuthUtilsService);
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('/users (GET)', () => {
        it('returns 401 if bearer token (jwt) is not provided', () => {
            return request(app.getHttpServer())
                .get('/users')
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

        it('returns 403 if the bearer token is not from an admin', async () => {
            const user = await userService.findByEmail('barry@starlabs.com');
            const token = authUtilsService.generateAccessToken(user);

            return request(app.getHttpServer())
                .get('/users')
                .set('Authorization', `Bearer ${token}`)
                .expect(403)
                .expect(({ body }) => {
                    expect(body).toEqual(
                        expect.objectContaining({
                            statusCode: 403,
                            message: 'Forbidden resource'
                        })
                    );
                });
        });

        // seed.ts creates 2 users on initial migration
        it('returns the two seed users when requested by an admin', async () => {
            const admin = await userService.findByEmail('oliver@qc.com');
            const token = authUtilsService.generateAccessToken(admin);

            return request(app.getHttpServer())
                .get('/users')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .expect(({ body }) => {
                    expect(body).toHaveLength(2);
                });
        });
    });

    describe('/users/me (GET)', () => {
        it('returns 401 if bearer token (jwt) is not provided', () => {
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
            const token = authUtilsService.generateAccessToken(oliver);
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
