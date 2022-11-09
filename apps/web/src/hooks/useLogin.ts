import { useMutation } from 'react-query';
import { useAuthContext } from '../context/authContext';
import { makeLogin } from '../dataService';

interface LoginCallbacks {
    onSuccess?: () => void;
    onError?: () => void;
}

export function useLogin({ onSuccess, onError }: LoginCallbacks) {
    const { login } = useAuthContext();

    return useMutation(makeLogin, {
        onSuccess: (data) => {
            if (data.statusCode === 401 && onError) {
                onError();
            } else {
                onSuccess && onSuccess();
                login(data?.access_token, data?.user);
            }
        },
        onError: onError
    });
}
