import '@testing-library/jest-dom';
import App from './App';
import { render, screen } from '@testing-library/react';

test('App title is visible', () => {
    render(<App />);
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
});
