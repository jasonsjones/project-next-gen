import { useMutation } from 'react-query';
import { useAuthContext } from '../context/authContext';
import { makeLogout } from '../dataService';

export function useLogout(onSuccessCb?: () => void) {
    const { logout } = useAuthContext();

    return useMutation(makeLogout, {
        onSuccess: (data) => {
            if (data.success) {
                logout();
            }
            onSuccessCb && onSuccessCb();
        }
    });
}
