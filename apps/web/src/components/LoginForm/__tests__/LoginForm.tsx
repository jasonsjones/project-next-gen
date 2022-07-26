import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginForm from '../index';

const server = setupServer(
    rest.post('http://localhost:3000/api/v1/auth/login', (_, res, ctx) => {
        return res(ctx.status(401), ctx.json({ statusCode: 401, message: 'Unauthorized' }));
    })
);

const queryClient = new QueryClient();

describe('LoginForm component', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());

    afterEach(cleanup);

    it('renders a form', () => {
        const { container } = render(
            <QueryClientProvider client={queryClient}>
                <LoginForm />
            </QueryClientProvider>
        );
        expect(container.querySelector('form')).toBeTruthy();
    });

    it('renders a email field', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <LoginForm />
            </QueryClientProvider>
        );
        expect(screen.getByLabelText('Email')).toBeTruthy();
    });

    it('renders a password field', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <LoginForm />
            </QueryClientProvider>
        );
        expect(screen.getByLabelText('Password')).toBeTruthy();
    });

    it('renders a Login button', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <LoginForm />
            </QueryClientProvider>
        );
        expect(screen.getByText('Login')).toBeTruthy();
    });

    it('displays unauthorized message when invalid credentials are provided', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <LoginForm />
            </QueryClientProvider>
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Login');

        await userEvent.type(emailInput, 'unknown-user@example.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.click(loginButton);

        await screen.findByText(/unauthorized/i);
    });
});
