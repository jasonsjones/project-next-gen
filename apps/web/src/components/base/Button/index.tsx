interface ButtonProps {
    children?: React.ReactNode;
    type?: 'button' | 'submit';
    className?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    clickAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
    children,
    type = 'button',
    className,
    variant = 'primary',
    clickAction
}: ButtonProps): JSX.Element {
    const primaryClasses =
        'border-2 rounded-md text-gray-100 border-purple-800 bg-purple-800 hover:bg-purple-700';
    const secondaryClasses =
        'border-2 rounded-md text-purple-800 border-purple-800 bg-white hover:bg-gray-100';
    const tertiaryClasses = 'rounded-md text-purple-800 hover:bg-gray-100';

    const variantClasses =
        variant === 'primary'
            ? primaryClasses
            : variant === 'secondary'
            ? secondaryClasses
            : tertiaryClasses;

    return (
        <button
            type={type}
            className={`py-2 px-4 ${variantClasses} ${className}`.trim()}
            onClick={clickAction}
        >
            {children}
        </button>
    );
}

export default Button;
