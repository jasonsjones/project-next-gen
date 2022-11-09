import 'whatwg-fetch';
import { RequestHandler, rest } from 'msw';
import { setupServer } from 'msw/node';
import { testUser, TEST_TOKEN } from './fixtures';

export const BASE_URL = 'http://localhost:3000';

const authSuccessResponse = {
    access_token: TEST_TOKEN,
    user: testUser
};

const handlers: RequestHandler[] = [
    rest.post(`${BASE_URL}/api/v1/auth/login`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(authSuccessResponse));
    }),

    rest.post(`${BASE_URL}/api/v1/users`, (_, res, ctx) => {
        return res(ctx.status(201), ctx.json(authSuccessResponse));
    }),

    rest.get('*', (req, res, ctx) => {
        console.error(`Request handler not provided for ${req.url.toString()}`);
        return res(ctx.status(500), ctx.json({ error: 'Request handler not provided' }));
    })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
