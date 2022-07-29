import { createContext, useContext, useState } from 'react';

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
