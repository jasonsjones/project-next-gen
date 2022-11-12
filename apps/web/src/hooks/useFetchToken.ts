import { useQuery } from 'react-query';
import { fetchToken } from '../dataService';
import { User } from '../types';

export function useFetchToken(
    interval: number,
    onSuccessCb: (data: { access_token: string; user: User }) => void
) {
    return useQuery('accessToken', fetchToken, {
        refetchInterval: 1000 * 60 * interval,
        onSuccess: onSuccessCb
    });
}
