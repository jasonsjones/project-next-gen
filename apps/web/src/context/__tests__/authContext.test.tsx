import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuthContext } from '../authContext';

const TEST_TOKEN = 'this-is-a-test-token-value';

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
    it('initializes with default token value', () => {
        render(<AuthConsumer />, { wrapper });
        expect(screen.getByText(/^Token/)).toHaveTextContent('Token value:');
    });

    it('updates the token value on login', async () => {
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
