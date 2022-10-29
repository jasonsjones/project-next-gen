import { useQuery } from 'react-query';
import { useAuthContext } from '../context/authContext';
import { fetchMe } from '../dataService';

export function useFetchMe() {
    const { token } = useAuthContext();
    return useQuery(['fetchMe', token], fetchMe);
}
