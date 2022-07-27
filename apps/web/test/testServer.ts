import 'whatwg-fetch';
import { RequestHandler, rest } from 'msw';
import { setupServer } from 'msw/node';

export const BASE_URL = 'http://localhost:3000';

const loginSuccessResponse = {
    access_token:
        'eyJhbGciOiJIUzI1NR5cCI6IkpXVCJ9.eyJzdWIiOiIzY2JkjDIzNDIsImV4cCI6MDg4Mjk0Mn0.NGtRnsX3NgRrAHBExlirJ6eg8W4aFZUE',
    user: {
        id: '3cbd5f5a-3aec-4056-be7a-a1db2500ae93',
        email: 'oliver@qc.com',
        firstName: 'Oliver',
        lastName: 'Queen',
        createdAt: '2022-07-21T03:55:49.068Z',
        updatedAt: '2022-07-21T03:55:49.068Z'
    }
};

const handlers: RequestHandler[] = [
    rest.post(`${BASE_URL}/api/v1/auth/login`, (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(loginSuccessResponse));
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
