import { useMutation, useQueryClient } from 'react-query';
import { useAuthContext } from '../context/authContext';
import { updateUser } from '../dataService';
import { ClientActions, User, UserUpdateDto } from '../types';

export function useUpdateMe({ clientActionSuccess }: ClientActions) {
    const { contextUser, token, updateCtxUser } = useAuthContext();
    const queryClient = useQueryClient();

    if (!contextUser?.id) {
        throw Error('context user not defined');
    }

    const mutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data: User) => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
            if (data) {
                updateCtxUser(data);
            }
            if (clientActionSuccess) {
                clientActionSuccess();
            }
        }
    });

    const updateMe = (dto: UserUpdateDto) => {
        mutation.mutate({ id: contextUser.id, dto, token });
    };

    return {
        ...mutation,
        mutate: updateMe
    };
}
