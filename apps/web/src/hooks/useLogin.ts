import { useMutation } from 'react-query';
import { makeLogin } from '../dataService';

interface LoginCallbacks {
    onSuccess?: () => void;
    onError?: () => void;
}

export default function useLogin({ onSuccess, onError }: LoginCallbacks) {
    return useMutation(makeLogin, {
        onSuccess: (data) => {
            if (data.statusCode === 401 && onError) {
                onError();
            } else {
                onSuccess && onSuccess();
            }
        },
        onError: onError
    });
}
