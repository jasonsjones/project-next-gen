import { render, screen } from '@testing-library/react';
import App from './App';

test('App title is visible', () => {
    render(<App />);
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
});
