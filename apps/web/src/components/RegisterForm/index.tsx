import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import Button from '../base/Button';
import TextInput from '../base/TextInput';

interface SignupFormProps {
    className?: string;
}

function RegisterForm({ className }: SignupFormProps): JSX.Element {
    const { mutate: doSubmit } = useSignup({
        onSuccess: clearForm,
        onError: () => {
            setError('⛔ Something went wrong. Please try again.');
        }
    });

    const [error, setError] = useState<string>('');

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        signupEmail: '',
        signupPassword: ''
    });

    function updateField(event: React.ChangeEvent<HTMLInputElement>) {
        setFormValues({
            ...formValues,
            [event.target.id]: event.target.value
        });
    }

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isFormValid()) {
            doSubmit({
                email: formValues.signupEmail,
                password: formValues.signupPassword,
                firstName: formValues.firstName,
                lastName: formValues.lastName
            });
        } else {
            setError('Required information missing');
        }
    }

    function clearForm() {
        setError('');
        setFormValues({
            firstName: '',
            lastName: '',
            signupEmail: '',
            signupPassword: ''
        });
    }

    function isFormValid() {
        const isValid =
            formValues.firstName.length > 0 &&
            formValues.lastName.length > 0 &&
            formValues.signupEmail.length > 0 &&
            formValues.signupPassword.length > 0;

        return isValid;
    }

    return (
        <>
            <form className={className} onSubmit={handleSubmit}>
                <div className="flex gap-8">
                    <TextInput
                        id="firstName"
                        label="First Name"
                        type="text"
                        value={formValues.firstName}
                        className="grow"
                        changeHandler={updateField}
                    />
                    <TextInput
                        id="lastName"
                        label="Last Name"
                        type="text"
                        value={formValues.lastName}
                        className="grow"
                        changeHandler={updateField}
                    />
                </div>
                <TextInput
                    id="signupEmail"
                    label="Email"
                    type="email"
                    value={formValues.signupEmail}
                    className="mt-8"
                    changeHandler={updateField}
                />
                <TextInput
                    id="signupPassword"
                    label="Password"
                    type="password"
                    value={formValues.signupPassword}
                    className="mt-8"
                    changeHandler={updateField}
                />
                <Button variant="primary" type="submit" className="mt-8 w-full">
                    Signup
                </Button>
                {error && <p className=" mt-4 text-red-700 text-lg">{error}</p>}
            </form>
        </>
    );
}

export default RegisterForm;
