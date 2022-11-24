import { useMutation } from 'react-query';
import { useAuthContext } from '../context/authContext';
import { makeLogin } from '../dataService';
import { ClientActions } from '../types';

export function useLogin({ clientActionSuccess, clientActionError }: ClientActions) {
    const { login } = useAuthContext();

    return useMutation(makeLogin, {
        onSuccess: (data) => {
            if (data.statusCode === 401 && clientActionError) {
                clientActionError();
            } else {
                clientActionSuccess?.();
                login(data?.access_token, data?.user);
            }
        },
        onError: clientActionError
    });
}
