import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./hooks/useFetchToken', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('App', () => {
    it('title is visible', async () => {
        render(<App />);
        expect(await screen.findByText(/Vite \+ React/i)).toBeInTheDocument();
    });
});
