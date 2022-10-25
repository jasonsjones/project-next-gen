import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks';

function AuthenticatedLinks(): JSX.Element {
    const navigate = useNavigate();

    const { mutate: doLogout } = useLogout(() => {
        navigate('/');
    });

    return (
        <ul className="grow flex gap-6 justify-end">
            <li>
                <button className="hover:text-slate-600" onClick={() => doLogout()}>
                    Log out
                </button>
            </li>
        </ul>
    );
}

export default AuthenticatedLinks;
