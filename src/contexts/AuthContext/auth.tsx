import { createContext, useContext, useState } from "react";

interface AuthContextProps {
    logout: () => void;
    user: { name: string | null; email: string | null };
    setAuthUser: (user: { name: string; email: string }) => void;
}

const AuthContext = createContext<AuthContextProps>({
    logout: () => {},
    user: { name: null, email: null },
    setAuthUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
    const [user, setUser] = useState<{ name: string | null; email: string | null }>({
        name: localStorage.getItem("userName"),
        email: localStorage.getItem("userEmail"),
    });

    const setAuthUser = (user: { name: string; email: string }) => {
        setUser(user);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
    };

    const logout = () => {
        localStorage.clear();
        setUser({ name: null, email: null });
    };

    return (
        <AuthContext.Provider value={{ logout, user, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};