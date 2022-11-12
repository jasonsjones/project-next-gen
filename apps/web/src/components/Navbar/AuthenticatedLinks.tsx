import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { useLogout } from '../../hooks';

function AuthenticatedLinks(): JSX.Element {
    const navigate = useNavigate();

    const { contextUser } = useAuthContext();

    const { mutate: doLogout } = useLogout(() => {
        navigate('/');
    });

    return (
        <ul className="grow flex gap-6 justify-end">
            <li>
                <NavLink
                    to="profile"
                    className={({ isActive }) =>
                        isActive ? 'text-slate-600' : 'hover:text-slate-600'
                    }
                >
                    {contextUser?.firstName} {contextUser?.lastName}
                </NavLink>
            </li>
            <li>
                <button className="hover:text-slate-600" onClick={() => doLogout()}>
                    Log out
                </button>
            </li>
        </ul>
    );
}

export default AuthenticatedLinks;
