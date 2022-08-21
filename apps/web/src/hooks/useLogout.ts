import { useMutation } from 'react-query';
import { useAuthContext } from '../context/authContext';
import { makeLogout } from '../dataService';

export function useLogout() {
    const { logout } = useAuthContext();

    return useMutation(makeLogout, {
        onSuccess: (data) => {
            if (data.success) {
                logout();
            }
        }
    });
}
