interface TextInputProps {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'password';
    className?: string;
    value: string | undefined;
    changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({
    id,
    label,
    type = 'text',
    className = '',
    value,
    changeHandler
}: TextInputProps): JSX.Element {
    const classes = `relative flex flex-col ${className}`.trim();
    return (
        <div className={classes}>
            <input
                id={id}
                type={type}
                placeholder={label}
                className="peer h-10 border-b-2 border-gray-300 placeholder-transparent focus:border-purple-700 focus:outline-none"
                value={value}
                onChange={changeHandler}
            />
            <label
                htmlFor={id}
                className="absolute -top-3.5 left-0 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
            >
                {label}
            </label>
        </div>
    );
}

export default TextInput;
