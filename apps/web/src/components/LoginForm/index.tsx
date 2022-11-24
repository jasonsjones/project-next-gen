import { useState } from 'react';
import { useLogin } from '../../hooks';
import Button from '../base/Button';
import TextInput from '../base/TextInput';

interface LoginFormProps {
    className?: string;
}

function LoginForm({ className }: LoginFormProps): JSX.Element {
    const {
        mutate: doLogin,
        isLoading,
        data
    } = useLogin({
        clientActionSuccess: clearForm,
        clientActionError: () => {
            setError('⛔ Unauthorized. Please try again.');
        }
    });

    const [error, setError] = useState<string>('');

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    function updateField(event: React.ChangeEvent<HTMLInputElement>) {
        setFormValues({
            ...formValues,
            [event.target.id]: event.target.value
        });
    }

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        if (formValues.email.length > 0 && formValues.password.length > 0) {
            doLogin(formValues);
        }
    }

    function clearForm() {
        setError('');
        setFormValues({
            email: '',
            password: ''
        });
    }

    return (
        <form className={className} onSubmit={handleSubmit}>
            <TextInput
                id="email"
                label="Email"
                type="email"
                value={formValues.email}
                changeHandler={updateField}
            />
            <TextInput
                id="password"
                label="Password"
                type="password"
                value={formValues.password}
                className="mt-8"
                changeHandler={updateField}
            />
            <Button variant="primary" type="submit" className="mt-8 w-full">
                {`${isLoading ? 'Logging in...' : 'Login'}`}
            </Button>
            {error && <p className=" mt-4 text-red-700 text-lg">{error}</p>}
            {data && data.access_token && (
                <p className=" mt-4 text-green-700 text-lg">✅ Login successful.</p>
            )}
        </form>
    );
}

export default LoginForm;
