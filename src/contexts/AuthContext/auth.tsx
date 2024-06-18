import { createContext, useContext, useState, ReactElement, useEffect } from "react";

interface AuthContextType {
    user: { name: string | null; lastName: string | null; email: string | null };
    setAuthUser: (user: { name: string; lastName: string; email: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: { name: null, lastName: null, email: null },
    setAuthUser: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState<{ name: string | null; lastName: string | null; email: string | null }>({
        name: localStorage.getItem("name"),
        lastName: localStorage.getItem("lastName"),
        email: localStorage.getItem("userEmail"),
    });

    const setAuthUser = (user: { name: string; lastName: string; email: string }) => {
        console.log("Setting user:", user);  
        setUser(user);
        localStorage.setItem("name", user.name);
        localStorage.setItem("lastName", user.lastName);
        localStorage.setItem("userEmail", user.email);
    };

    useEffect(() => {
        console.log("User state updated:", user);
    }, [user]);

    const logout = () => {
        localStorage.clear();
        setUser({ name: null, lastName: null, email: null });
    };

    return (
        <AuthContext.Provider value={{ user, setAuthUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};