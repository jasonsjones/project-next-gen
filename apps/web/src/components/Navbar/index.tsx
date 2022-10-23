import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <header className="text-slate-400 bg-slate-100">
            <nav className="h-20 px-10  flex items-center">
                <Link to="/">
                    <span className="text-slate-600 text-xl">&lt;Site Logo&gt;</span>
                </Link>

                <ul className="grow flex gap-6 justify-end">
                    <li>
                        <NavLink
                            to="login"
                            className={({ isActive }) =>
                                isActive ? 'text-slate-600' : 'hover:text-slate-600'
                            }
                        >
                            Log in
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="register"
                            className={({ isActive }) =>
                                isActive ? 'text-slate-600' : 'hover:text-slate-600'
                            }
                        >
                            Register
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
