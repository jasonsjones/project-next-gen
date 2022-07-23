import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../index';

describe('Button component', () => {
    const BUTTON_TEXT = 'Test Button';

    afterEach(cleanup);

    it('renders a button', () => {
        render(<Button>{BUTTON_TEXT}</Button>);
        expect(screen.getByRole('button')).toBeTruthy();
    });

    it(`renders a default <button> with type 'button'`, () => {
        render(<Button></Button>);
        const button = screen.getByRole('button');
        expect(button.getAttribute('type')).toBe('button');
    });

    it(`renders a submit <button>`, () => {
        render(<Button type="submit">Submit</Button>);
        const button = screen.getByRole('button');
        expect(button.getAttribute('type')).toBe('submit');
    });

    it('secondary variant has a white bg color', () => {
        render(<Button variant="secondary">{BUTTON_TEXT}</Button>);
        const button = screen.getByText(BUTTON_TEXT);
        expect(button.classList.contains('bg-white')).toBe(true);
    });

    it('fires click handler when clicked', async () => {
        const handler = jest.fn();
        render(<Button clickAction={handler}>{BUTTON_TEXT}</Button>);
        const button = screen.getByText(BUTTON_TEXT);
        await userEvent.click(button);
        expect(handler).toHaveBeenCalledTimes(1);
    });
});
