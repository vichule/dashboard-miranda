import { createContext, useContext, useState, ReactElement, useEffect } from "react";

interface AuthContextType {
    user: { firstName: string | null; lastName: string | null; email: string | null };
    setAuthUser: (user: { firstName: string; lastName: string; email: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: { firstName: null, lastName: null, email: null },
    setAuthUser: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState<{ firstName: string | null; lastName: string | null; email: string | null }>({
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        email: localStorage.getItem("userEmail"),
    });

    const setAuthUser = (user: { firstName: string; lastName: string; email: string }) => {
        console.log("Setting user:", user);  // Debugging line
        setUser(user);
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("lastName", user.lastName);
        localStorage.setItem("userEmail", user.email);
    };

    useEffect(() => {
        console.log("User state updated:", user);
    }, [user]);

    const logout = () => {
        localStorage.clear();
        setUser({ firstName: null, lastName: null, email: null });
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