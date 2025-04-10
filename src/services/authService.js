import { MockUsers } from "../../mock data/db";

export const logIn = async (email, password) => {
    try {
        const user = MockUsers.find(user => user.email === email && user.password === password);
        if (user) {
            return { ...user, password: undefined };
        }
        throw new Error('Invalid email or password');
    } catch (error) {
        throw new Error('Error logging in: ' + error.message);
    }
}

export const logOut = async () => {
    try {
        return { message: 'Logged out successfully' };
    } catch (error) {
        throw new Error('Error logging out: ' + error.message);
    }
}