import { useMutation } from 'react-query';
import { useAuthContext } from '../context/authContext';
import { makeSignup } from '../dataService';

interface LoginCallbacks {
    onSuccess?: () => void;
    onError?: () => void;
}

export function useSignup({ onSuccess, onError }: LoginCallbacks) {
    const { login } = useAuthContext();

    return useMutation(makeSignup, {
        onSuccess: (data) => {
            if (data?.access_token) {
                login(data?.access_token);
            }

            if (onSuccess) {
                onSuccess();
            }
        },
        onError: onError
    });
}
