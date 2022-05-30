import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import { createServer } from '../src/server';

describe('API functional tests', () => {
    it('index route redirects to /api', async () => {
        await supertest(createServer())
            .get('/')
            .expect(302)
            .then((res) => {
                expect(res.text).toEqual('Found. Redirecting to /api');
            });
    });

    it('base /api route  returns 200', async () => {
        await supertest(createServer())
            .get('/api')
            .expect(200)
            .then((res) => {
                expect(res.body.ok).toBe(true);
                expect(res.body.message).toEqual(expect.any(String));
            });
    });

    it('health check returns 200', async () => {
        await supertest(createServer())
            .get('/api/healthcheck')
            .expect(200)
            .then((res) => {
                expect(res.body.ok).toBe(true);
                expect(res.body.message).toEqual(expect.any(String));
            });
    });
});
