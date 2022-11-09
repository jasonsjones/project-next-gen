import { useMutation } from 'react-query';
import { useAuthContext } from '../context/authContext';
import { makeSignup } from '../dataService';

interface SignupCallbacks {
    onSuccess?: () => void;
    onError?: () => void;
}

export function useSignup({ onSuccess, onError }: SignupCallbacks) {
    const { login } = useAuthContext();

    return useMutation(makeSignup, {
        onSuccess: (data) => {
            if (data?.access_token) {
                login(data?.access_token, data?.user);
            }

            if (onSuccess) {
                onSuccess();
            }
        },
        onError
    });
}
