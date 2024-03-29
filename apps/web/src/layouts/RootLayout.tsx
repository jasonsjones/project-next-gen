import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import { useAuthContext } from '../context/authContext';

function RootLayout(): JSX.Element {
    const { isFetchingToken } = useAuthContext();

    if (isFetchingToken) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow flex-shrink-0">
                <Outlet />
            </div>
            <footer className="flex p-8 text-slate-400 bg-slate-100">
                <div>&lt;Footer&gt;</div>
                <div className="grow pb-4 text-center text-gray-400 text-sm">
                    &copy; 2022 Orion Labs
                </div>
            </footer>
        </div>
    );
}

export default RootLayout;
