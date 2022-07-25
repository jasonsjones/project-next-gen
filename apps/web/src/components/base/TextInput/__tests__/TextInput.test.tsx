import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from '../index';

describe('TextInput component', () => {
    afterEach(cleanup);

    it('renders an input', () => {
        render(<TextInput id="name" label="Name" value="Oliver" changeHandler={jest.fn()} />);
        expect(screen.getByRole('textbox')).toBeTruthy();
    });

    it('defaults to text type', () => {
        render(<TextInput id="name" label="Name" value="Oliver" changeHandler={jest.fn()} />);
        const input = screen.getByLabelText('Name');
        expect(input.getAttribute('type')).toBe('text');
    });

    it('displays an input with the type provided', () => {
        render(
            <TextInput
                id="email"
                label="Email"
                type="email"
                value="oliver@sc.gov"
                changeHandler={jest.fn()}
            />
        );
        const input = screen.getByLabelText('Email');
        expect(input.getAttribute('type')).toBe('email');
    });

    it('displays a label', () => {
        render(
            <TextInput
                id="email"
                label="Email"
                type="email"
                value="oliver@sc.gov"
                changeHandler={jest.fn()}
            />
        );
        const label = screen.getByText('Email');
        expect(label).toBeTruthy();
    });

    it('calls changeHandler callback when value changes', async () => {
        const handler = jest.fn();
        render(<TextInput id="name" label="Name" value="Oliver" changeHandler={handler} />);
        const input = screen.getByLabelText('Name');
        await userEvent.type(input, 'ol');
        expect(handler).toHaveBeenCalledTimes(2);
    });
});
