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
