import { useMutation } from 'react-query';

interface LoginCallbacks {
    onSuccess?: () => void;
    onError?: () => void;
}

export default function useLogin({ onSuccess, onError }: LoginCallbacks) {
    return useMutation(
        ({ email, password }: { email: string; password: string }) => {
            return fetch('http://localhost:3000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }).then((res) => res.json());
        },
        {
            onSuccess: (data) => {
                if (data.statusCode === 401 && onError) {
                    onError();
                } else {
                    onSuccess && onSuccess();
                }
            },
            onError: onError
        }
    );
}
