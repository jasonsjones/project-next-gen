import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BASE_URL, server, rest } from '../../../../test/testServer';
import LoginForm from '../index';

const queryClient = new QueryClient();

function renderComponent() {
    return render(
        <QueryClientProvider client={queryClient}>
            <LoginForm />
        </QueryClientProvider>
    );
}

describe('LoginForm component', () => {
    afterEach(cleanup);

    it('renders a form', () => {
        const { container } = renderComponent();
        expect(container.querySelector('form')).toBeTruthy();
    });

    it('renders a email field', () => {
        renderComponent();
        expect(screen.getByLabelText('Email')).toBeTruthy();
    });

    it('renders a password field', () => {
        renderComponent();
        expect(screen.getByLabelText('Password')).toBeTruthy();
    });

    it('renders a Login button', () => {
        renderComponent();
        expect(screen.getByText('Login')).toBeTruthy();
    });

    it('changes text on Login button when making api call', async () => {
        renderComponent();

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Login');

        await userEvent.type(emailInput, 'unknown-user@test.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.click(loginButton);

        await screen.findByText(/logging in.../i);
    });

    it('displays success message when valid credentials are provided', async () => {
        renderComponent();

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Login');

        await userEvent.type(emailInput, 'valid-user@test.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.click(loginButton);

        await screen.findByText(/login successful/i);
    });

    it('displays unauthorized message when invalid credentials are provided', async () => {
        server.use(
            rest.post(`${BASE_URL}/api/v1/auth/login`, (_, res, ctx) => {
                return res(ctx.status(401), ctx.json({ statusCode: 401, message: 'Unauthorized' }));
            })
        );
        renderComponent();

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Login');

        await userEvent.type(emailInput, 'unknown-user@test.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.click(loginButton);

        await screen.findByText(/unauthorized/i);
    });
});
