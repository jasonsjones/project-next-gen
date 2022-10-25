import { NavLink } from 'react-router-dom';

function UnauthenticatedLinks(): JSX.Element {
    return (
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
    );
}

export default UnauthenticatedLinks;
