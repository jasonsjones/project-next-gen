import { useState } from 'react';
import UserDetails from '../components/UserDetails';
import UserDetailsEdit from '../components/UserDetailsEdit';

function UserProfile() {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    return (
        <div className="w-1/2 mx-auto pt-8">
            {!isEditMode ? (
                <div className="flex justify-end">
                    <button className="text-l text-gray-500" onClick={() => setIsEditMode(true)}>
                        Edit Profile
                    </button>
                </div>
            ) : null}
            <div className="pt-8 flex flex-col">
                {isEditMode ? (
                    <UserDetailsEdit exitEditMode={() => setIsEditMode(false)} />
                ) : (
                    <UserDetails />
                )}
            </div>
        </div>
    );
}

export default UserProfile;
