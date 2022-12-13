import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import AuthenticatedLinks from './AuthenticatedLinks';
import UnauthenticatedLinks from './UnauthenticatedLinks';
import siteLogo from '../../assets/logo-no-bg.svg';

function Navbar() {
    const { token } = useAuthContext();

    return (
        <header className="text-slate-400 bg-slate-100">
            <nav className="h-24 px-20 flex items-center">
                <Link to="/">
                    <img src={siteLogo} className="w-64" alt="Site logo" />
                </Link>
                {token ? <AuthenticatedLinks /> : <UnauthenticatedLinks />}
            </nav>
        </header>
    );
}

export default Navbar;
