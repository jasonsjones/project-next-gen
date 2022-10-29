import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';

function ProtectedRoutes(): JSX.Element {
    const { token } = useAuthContext();
    return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default ProtectedRoutes;
