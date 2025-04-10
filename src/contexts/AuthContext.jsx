import { createContext, useContext, useState } from "react";
import { logIn, logOut } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const loginHandler = async (userEmail, userPassword) => {
        try {
            const response = await logIn(userEmail, userPassword);
            setUser(response);
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (error) {
            console.error("Login error: ", error);
            throw new Error('Login failed: ' + error.message);
        }
    }

    const logoutHandler = () => {
        logOut()
            .then(() => {
                setUser(null);
                localStorage.removeItem('user');
                localStorage.clear();
                window.location.href = '/';
            })
            .catch(error => {
                console.error("Logout error: ", error);
            });
    }

    return (
        <AuthContext.Provider value={{ user, loginHandler, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
        
} 