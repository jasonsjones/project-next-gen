import { useMutation } from 'react-query';
import { useAuthContext } from '../context/authContext';
import { makeSignup } from '../dataService';
import { ClientActions } from '../types';

export function useSignup({ clientActionSuccess, clientActionError }: ClientActions) {
    const { login } = useAuthContext();

    return useMutation(makeSignup, {
        onSuccess: (data) => {
            if (data?.access_token) {
                login(data?.access_token, data?.user);
            }

            if (clientActionSuccess) {
                clientActionSuccess();
            }
        },
        onError: () => {
            if (clientActionError) {
                clientActionError();
            }
        }
    });
}
