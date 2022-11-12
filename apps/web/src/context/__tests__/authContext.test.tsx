/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testUser, TEST_TOKEN } from '../../testUtils/fixtures';
import { AuthProvider, useAuthContext } from '../authContext';

jest.mock('../../hooks', () => ({
    __esModule: true,
    useFetchToken: jest
        .fn()
        .mockImplementationOnce(() => ({ isLoading: false })) // first call
        .mockImplementationOnce((_, onSuccess) => {
            onSuccess({ access_token: TEST_TOKEN, user: testUser });
            return { isLoading: false };
        }) // second call
        .mockImplementation(() => ({ isLoading: false })) // remaining calls
}));

function wrapper({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}

function AuthConsumer(): JSX.Element {
    const { token, login, logout } = useAuthContext();

    return (
        <>
            <p>Token value: {token}</p>
            <button onClick={() => login(TEST_TOKEN, testUser)}>Login</button>
            <button onClick={() => logout()}>Logout</button>
        </>
    );
}
describe('AuthContext', () => {
    // Make use of the 'first call' implementation of the above mock;
    // order matters from the first two tests
    it('initializes with default token value', async () => {
        render(<AuthConsumer />, { wrapper });
        expect(await screen.findByText(/^Token/)).toHaveTextContent('Token value:');
    });

    // Make use of the 'second call' implementation of the above mock;
    // order matters from the first two tests
    it('sets the token value with response from useFetchToken', async () => {
        render(<AuthConsumer />, { wrapper });
        await screen.findByText(new RegExp(TEST_TOKEN));
    });

    it('sets the token value on login', async () => {
        render(<AuthConsumer />, { wrapper });
        const button = screen.getByText(/Login/);
        await userEvent.click(button);
        await screen.findByText(new RegExp(TEST_TOKEN));
    });

    it('clears the token value on logout', async () => {
        render(<AuthConsumer />, { wrapper });
        // Login and verify token
        const loginBtn = screen.getByText(/Login/);
        await userEvent.click(loginBtn);
        await screen.findByText(new RegExp(TEST_TOKEN));

        // Logout and verify token is removed
        const logoutBtn = screen.getByText(/Logout/);
        await userEvent.click(logoutBtn);
        expect(await screen.findByText(/^Token/)).toHaveTextContent('Token value:');
        expect(screen.queryByText(new RegExp(TEST_TOKEN))).toBeNull();
    });
});
