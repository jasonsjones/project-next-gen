import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function RootLayout(): JSX.Element {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow flex-shrink-0">
                <Outlet />
            </div>
            <footer className="p-8 text-slate-400 bg-slate-100">&lt;Footer&gt;</footer>
        </div>
    );
}

export default RootLayout;
