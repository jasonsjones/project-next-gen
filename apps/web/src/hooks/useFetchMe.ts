import { useQuery } from 'react-query';
import { useAuthContext } from '../context/authContext';
import { generateFetchMe } from '../dataService';

export function useFetchMe() {
    const { token } = useAuthContext();
    return useQuery({
        queryKey: 'me',
        queryFn: generateFetchMe(token),
        staleTime: 3 * 60 * 1000
    });
}
