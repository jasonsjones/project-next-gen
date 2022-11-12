import { createContext, useContext, useState } from 'react';
import { useFetchToken } from '../hooks';
import { User } from '../types';

const REFETCH_INTERVAL_IN_MINS = 8;

interface AuthContextProps {
    contextUser: User | null;
    token: string;
    isFetchingToken: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const initialState: AuthContextProps = {
    contextUser: null,
    token: '',
    isFetchingToken: false,
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

    const { isLoading: isFetchingToken } = useFetchToken(REFETCH_INTERVAL_IN_MINS, (data) => {
        if (data?.access_token) {
            setToken(data.access_token);
        }

        if (data?.user) {
            setContextUser(data.user);
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

    const value = { contextUser, token, isFetchingToken, login, logout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuthContext };
