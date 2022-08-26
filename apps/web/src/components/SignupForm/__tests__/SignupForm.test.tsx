import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BASE_URL, server, rest } from '../../../testUtils/testServer';
import SignupForm from '..';

const queryClient = new QueryClient();

function wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
describe('SignupForm component', () => {
    afterEach(cleanup);

    it('renders a form', () => {
        const { container } = render(<SignupForm />, { wrapper });
        expect(container.querySelector('form')).toBeTruthy();
    });

    it('renders a first name field', () => {
        render(<SignupForm />, { wrapper });
        expect(screen.getByLabelText('First Name')).toBeTruthy();
    });

    it('renders a last name field', () => {
        render(<SignupForm />, { wrapper });
        expect(screen.getByLabelText('Last Name')).toBeTruthy();
    });

    it('renders an email field', () => {
        render(<SignupForm />, { wrapper });
        expect(screen.getByLabelText('Email')).toBeTruthy();
    });

    it('renders a password field', () => {
        render(<SignupForm />, { wrapper });
        expect(screen.getByLabelText('Password')).toBeTruthy();
    });

    it('displays error message if the first name is not provided', async () => {
        render(<SignupForm />, { wrapper });

        const lastNameInput = screen.getByLabelText('Last Name');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const signupButton = screen.getByText('Signup');

        await userEvent.type(lastNameInput, 'Smith');
        await userEvent.type(emailInput, 'valid-user@test.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.click(signupButton);

        await screen.findByText(/missing required information/i);
    });

    it('displays error message if the last name is not provided', async () => {
        render(<SignupForm />, { wrapper });

        const firstNameInput = screen.getByLabelText('First Name');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const signupButton = screen.getByText('Signup');

        await userEvent.type(firstNameInput, 'James');
        await userEvent.type(emailInput, 'valid-user@test.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.click(signupButton);

        await screen.findByText(/missing required information/i);
    });

    it('displays error message if the email is not provided', async () => {
        render(<SignupForm />, { wrapper });

        const firstNameInput = screen.getByLabelText('First Name');
        const lastNameInput = screen.getByLabelText('Last Name');
        const passwordInput = screen.getByLabelText('Password');
        const signupButton = screen.getByText('Signup');

        await userEvent.type(firstNameInput, 'James');
        await userEvent.type(lastNameInput, 'Smith');
        await userEvent.type(passwordInput, '123456');
        await userEvent.click(signupButton);

        await screen.findByText(/missing required information/i);
    });

    it('displays error message if the password is not provided', async () => {
        render(<SignupForm />, { wrapper });

        const firstNameInput = screen.getByLabelText('First Name');
        const lastNameInput = screen.getByLabelText('Last Name');
        const emailInput = screen.getByLabelText('Email');
        const signupButton = screen.getByText('Signup');

        await userEvent.type(firstNameInput, 'James');
        await userEvent.type(lastNameInput, 'Smith');
        await userEvent.type(emailInput, 'valid-user@test.com');
        await userEvent.click(signupButton);

        await screen.findByText(/missing required information/i);
    });

    it('clears the form on successful submission', async () => {
        render(<SignupForm />, { wrapper });

        const firstNameInput = screen.getByLabelText('First Name');
        const lastNameInput = screen.getByLabelText('Last Name');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const signupButton = screen.getByText('Signup');

        await userEvent.type(firstNameInput, 'James');
        await userEvent.type(lastNameInput, 'Smith');
        await userEvent.type(emailInput, 'valid-user@test.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.click(signupButton);

        waitFor(() => {
            expect(firstNameInput).toHaveValue('');
            expect(lastNameInput).toHaveValue('');
            expect(emailInput).toHaveValue('');
            expect(passwordInput).toHaveValue('');
        });
    });

    it('displays error message if there is an error with signing up', async () => {
        // supress console.error output for this test
        jest.spyOn(console, 'error').mockImplementationOnce(() => {});

        server.use(
            rest.post(`${BASE_URL}/api/v1/users`, async (_, res, ctx) => {
                return res(
                    ctx.status(500),
                    ctx.json({ statusCode: 500, message: 'Internal Server Error' })
                );
            })
        );

        render(<SignupForm />, { wrapper });

        const firstNameInput = screen.getByLabelText('First Name');
        const lastNameInput = screen.getByLabelText('Last Name');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const signupButton = screen.getByText('Signup');

        await userEvent.type(firstNameInput, 'James');
        await userEvent.type(lastNameInput, 'Smith');
        await userEvent.type(emailInput, 'valid-user@test.com');
        await userEvent.type(passwordInput, '123456');
        await userEvent.click(signupButton);

        await screen.findByText(/something went wrong/i);
    });
});
