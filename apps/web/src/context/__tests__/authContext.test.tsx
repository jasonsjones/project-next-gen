/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuthContext } from '../authContext';

const TEST_TOKEN = 'this-is-a-test-token-value';

jest.mock('../../hooks/useFetchToken', () => ({
    __esModule: true,
    default: jest
        .fn()
        .mockImplementationOnce(() => {}) // first call
        .mockImplementationOnce((_, onSuccess) => {
            onSuccess({ success: true, access_token: TEST_TOKEN });
        }) // second call
        .mockImplementation(() => {}) // remaining calls
}));

function wrapper({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}

function AuthConsumer(): JSX.Element {
    const { token, login, logout } = useAuthContext();

    return (
        <>
            <p>Token value: {token}</p>
            <button onClick={() => login(TEST_TOKEN)}>Login</button>
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
