import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuthContext } from '../authContext';

const TEST_TOKEN = 'this-is-a-test-token-value';

function wrapper({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}

function AuthConsumer(): JSX.Element {
    const { token, login } = useAuthContext();

    return (
        <>
            <p>Token value: {token}</p>
            <button onClick={() => login(TEST_TOKEN)}>Login</button>
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
});
