import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import AuthenticatedLinks from './AuthenticatedLinks';
import UnauthenticatedLinks from './UnauthenticatedLinks';

function Navbar() {
    const { token } = useAuthContext();

    return (
        <header className="text-slate-400 bg-slate-100">
            <nav className="h-20 px-10  flex items-center">
                <Link to="/">
                    <span className="text-slate-600 text-xl">&lt;Site Logo&gt;</span>
                </Link>
                {token ? <AuthenticatedLinks /> : <UnauthenticatedLinks />}
            </nav>
        </header>
    );
}

export default Navbar;
