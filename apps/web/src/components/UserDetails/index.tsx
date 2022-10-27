function UserDetails(): JSX.Element {
    return (
        <div className="flex gap-8 items-center">
            <img src="https://randomuser.me/api/portraits/men/19.jpg" className="rounded-full" />
            <div>
                <p className="text-4xl mb-2 text-purple-800">Oliver Queen</p>
                <p className="text-2xl text-gray-700">ollie@qc.com</p>
            </div>
        </div>
    );
}

export default UserDetails;
