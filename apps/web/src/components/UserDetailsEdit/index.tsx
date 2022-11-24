import React, { useState } from 'react';
import { useFetchMe, useUpdateMe } from '../../hooks';
import { UserUpdateDto } from '../../types';
import Button from '../base/Button';
import TextInput from '../base/TextInput';

interface UserDetailsEditProps {
    exitEditMode: () => void;
}

function UserDetailsEdit({ exitEditMode }: UserDetailsEditProps): JSX.Element | null {
    const { data, isLoading } = useFetchMe();

    const { mutate } = useUpdateMe({
        onSuccess: () => {
            exitEditMode();
        }
    });

    const [formValues, setFormValues] = useState<UserUpdateDto>({
        firstName: data?.user.firstName,
        lastName: data?.user.lastName,
        email: data?.user.email
    });

    if (isLoading) {
        return null;
    }

    function updateField(event: React.ChangeEvent<HTMLInputElement>) {
        setFormValues({
            ...formValues,
            [event.target.id]: event.target.value
        });
    }

    function handleUpdate(event: React.FormEvent) {
        event.preventDefault();
        console.log('Handling the update with....');
        console.log({ formValues });
        mutate(formValues);
    }

    return (
        <div className="mt-6 flex gap-8 items-center">
            <img src="https://dummyimage.com/200/ccc/333" className="rounded-full" />
            <form className="grow" onSubmit={handleUpdate}>
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
                    id="email"
                    label="Email"
                    type="email"
                    value={formValues.email}
                    className="mt-8"
                    changeHandler={updateField}
                />
                <div className="flex gap-4 justify-end">
                    <Button
                        variant="secondary"
                        type="button"
                        className="mt-8"
                        clickAction={exitEditMode}
                    >
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" className="mt-8">
                        Update
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default UserDetailsEdit;
