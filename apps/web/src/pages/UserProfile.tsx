import UserDetails from '../components/UserDetails';

function UserProfile() {
    return (
        <div className="pt-8 flex flex-col items-center">
            <div className="w-1/2">
                <UserDetails />
            </div>
        </div>
    );
}

export default UserProfile;
