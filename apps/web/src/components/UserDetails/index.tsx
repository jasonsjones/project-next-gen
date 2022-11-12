import { useFetchMe } from '../../hooks';

function UserDetails(): JSX.Element | null {
    const { data, isLoading } = useFetchMe();

    if (isLoading) {
        return null;
    }

    return (
        <div className="flex gap-8 items-center">
            <img src="https://randomuser.me/api/portraits/men/19.jpg" className="rounded-full" />
            <div>
                <p className="text-4xl mb-2 text-purple-800">{`${data?.user.firstName} ${data?.user.lastName}`}</p>
                <p className="text-2xl text-gray-700">{data?.user.email}</p>
            </div>
        </div>
    );
}

export default UserDetails;
