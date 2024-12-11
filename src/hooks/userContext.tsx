import React, { useState, createContext, useEffect, ReactNode } from "react";
import Cookies from 'js-cookie';
import { User } from "../utils/types";

interface LoginData {
    accessToken: string;
    refreshToken: string;
    user: User;
}

interface UserContextType {
    accessToken: string | null;
    user: User | null;
    login: (data: LoginData) => void;
    logout: () => void;
    updateUserData: (user: User) => void;
    loading: boolean;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
    accessToken: null,
    user: null,
    login: () => { },
    logout: () => { },
    updateUserData: () => { },
    loading: true,
});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const accessTokenFromCookie = Cookies.get('accessTokenEliteCars');
        const userDataFromCookie = Cookies.get('userDataEliteCars');
        if (accessTokenFromCookie && userDataFromCookie) {
            setAccessToken(accessTokenFromCookie);
            setUser(JSON.parse(userDataFromCookie) as User);
        }
        setLoading(false);
    }, []);

    const login = (data: LoginData) => {
        const { accessToken, refreshToken, user } = data;
        setAccessToken(accessToken);
        setUser(user);

        Cookies.set('accessTokenEliteCars', accessToken, {
            secure: true,
            sameSite: 'Strict'
        });

        Cookies.set('refreshTokenEliteCars', refreshToken, {
            secure: true,
            sameSite: 'Strict'
        });

        Cookies.set('userDataEliteCars', JSON.stringify(user), {
            secure: true,
            sameSite: 'Strict'
        });
    };

    const logout = () => {
        setAccessToken(null);
        Cookies.remove('accessTokenEliteCars');
        Cookies.remove('userDataEliteCars');
    };

    const updateUserData = (user: User) => {
        setUser(user);
        Cookies.set('userDataEliteCars', JSON.stringify(user), {
            secure: true,
            sameSite: 'Strict'
        });
    };

    return (
        <UserContext.Provider value={{ accessToken, user, login, logout, updateUserData, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;