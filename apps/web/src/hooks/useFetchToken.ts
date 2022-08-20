import { useQuery } from 'react-query';
import { fetchToken } from '../dataService';

export default function useFetchToken(
    interval: number,
    onSuccessCb: (data: { success: boolean; access_token: string }) => void
) {
    return useQuery('accessToken', fetchToken, {
        refetchInterval: 1000 * 60 * interval,
        onSuccess: onSuccessCb
    });
}
