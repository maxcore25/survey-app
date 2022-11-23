import React, { createContext, useState, useContext } from 'react';

const authContext = createContext();

function useAuth() {
    const [isAuth, setIsAuth] = useState(false);

    return {
        isAuth,
        login(email, password) {
            return new Promise((res) => {
                setIsAuth(true);
                res();
            });
        },
        logout() {
            return new Promise((res) => {
                setIsAuth(false);
                res();
            });
        },
    };
}

export function AuthProvider({ children }) {
    const isAuth = useAuth();

    return <authContext.Provider value={isAuth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return useContext(authContext);
}
