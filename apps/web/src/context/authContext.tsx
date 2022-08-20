import { createContext, useContext, useState } from 'react';
import useFetchToken from '../hooks/useFetchToken';

const REFETCH_INTERVAL_IN_MINS = 8;

interface AuthContextProps {
    token: string;
    login: (token: string) => void;
    logout: () => void;
}

const initialState: AuthContextProps = {
    token: '',
    login: () => {
        /* empty fn body */
    },
    logout: () => {
        /* empty fn body */
    }
};

const AuthContext = createContext<AuthContextProps>(initialState);

function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [token, setToken] = useState('');

    useFetchToken(REFETCH_INTERVAL_IN_MINS, (data) => {
        if (data?.success) {
            setToken(data.access_token);
        }
    });

    const login = (tokenVal: string) => {
        setToken(tokenVal);
    };

    const logout = () => {
        setToken('');
    };

    const value = { token, login, logout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
