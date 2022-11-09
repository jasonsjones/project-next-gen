import { createContext, useContext, useState } from 'react';
import { useFetchToken } from '../hooks';

const REFETCH_INTERVAL_IN_MINS = 8;

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    createdAt: string;
    updatedAt: string;
}

interface AuthContextProps {
    contextUser: User | null;
    token: string;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const initialState: AuthContextProps = {
    contextUser: null,
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
    const [contextUser, setContextUser] = useState<User | null>(null);

    useFetchToken(REFETCH_INTERVAL_IN_MINS, (data) => {
        if (data?.success) {
            setToken(data.access_token);
        }
    });

    const login = (tokenVal: string, user: User) => {
        setToken(tokenVal);
        setContextUser(user);
    };

    const logout = () => {
        setToken('');
        setContextUser(null);
    };

    const value = { contextUser, token, login, logout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
