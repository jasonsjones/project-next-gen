import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { UtilsModule } from '../../utils/utils.module';
import { AuthUtilsService } from '../auth-utils.service';

describe('Auth Util Service', () => {
    let service: AuthUtilsService;
    let jwt: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot(), UtilsModule],
            providers: [AuthUtilsService, JwtService]
        }).compile();

        service = module.get<AuthUtilsService>(AuthUtilsService);
        jwt = module.get<JwtService>(JwtService);
    });

    describe('generateAccessToken()', () => {
        it('generates an access token', () => {
            const userFields = {
                id: '2f2a1005-6255-4483-9b5b-114b0dfa3828',
                email: 'test@example.com'
            };

            const result = service.generateAccessToken(userFields);
            const parts = result.split('.');

            expect(parts).toHaveLength(3);
            expect(parts[0]).toMatch(/^eyJhbGciO/);
        });
    });

    describe('generateRefreshToken()', () => {
        it('generates a refresh token', () => {
            const userFields = {
                id: '2f2a1005-6255-4483-9b5b-114b0dfa3828',
                email: 'test@example.com'
            };

            const result = service.generateRefreshToken(userFields);
            const parts = result.split('.');

            expect(parts).toHaveLength(3);
            expect(parts[0]).toMatch(/^eyJhbGciO/);
        });
    });

    describe('verifyRefreshToken()', () => {
        it('verifies a refresh token', () => {
            const userFields = {
                id: '2f2a1005-6255-4483-9b5b-114b0dfa3828',
                email: 'test@example.com'
            };

            const token = service.generateRefreshToken(userFields);
            const decoded = service.verifyRefreshToken(token);
            expect(decoded).toEqual(
                expect.objectContaining({
                    sub: userFields.id,
                    email: userFields.email,
                    iat: expect.any(Number),
                    exp: expect.any(Number)
                })
            );
        });

        it('throws error if the refresh token is expired', () => {
            const twoHoursAgo = new Date();
            twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
            jest.spyOn(jwt, 'verify').mockImplementation(() => {
                throw new TokenExpiredError('jwt expired', twoHoursAgo);
            });

            const userFields = {
                id: '2f2a1005-6255-4483-9b5b-114b0dfa3828',
                email: 'test@example.com'
            };
            const token = service.generateRefreshToken(userFields);

            expect(() => {
                service.verifyRefreshToken(token);
            }).toThrow(TokenExpiredError);
        });

        it('throws error if the refresh token is otherwise invalid', () => {
            jest.spyOn(jwt, 'verify').mockImplementation(() => {
                throw new JsonWebTokenError('jwt malformed');
            });

            const userFields = {
                id: '2f2a1005-6255-4483-9b5b-114b0dfa3828',
                email: 'test@example.com'
            };
            const token = service.generateRefreshToken(userFields);

            expect(() => {
                service.verifyRefreshToken(token);
            }).toThrow(JsonWebTokenError);
        });
    });
});
