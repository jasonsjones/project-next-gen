import { cleanup, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginForm from '../index';

const queryClient = new QueryClient();
describe('LoginForm component', () => {
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
});
