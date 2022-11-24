import { useMutation } from 'react-query';
import { useAuthContext } from '../context/authContext';
import { makeLogout } from '../dataService';
import { ClientActions } from '../types';

export function useLogout({ clientActionSuccess }: ClientActions) {
    const { logout } = useAuthContext();

    return useMutation(makeLogout, {
        onSuccess: (data) => {
            if (!data.access_token) {
                logout();
            }
            clientActionSuccess && clientActionSuccess();
        }
    });
}
