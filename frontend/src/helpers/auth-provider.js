import {useState} from "react";
import DatabaseContext from "../context/database";
import {login, logout} from "../services/auth-service";

export function AuthProvider({children}) {

    const [counter, setCounter] = useState(0);

    const signIn = async (username, password) => {
        const res = await login(username, password);
        if (res) {
            setCounter(counter => (counter + 1) % 10);
            return true;
        } else {
            return false;
        }
    }

    const signOut = () => {
        logout();
        setCounter(counter => (counter + 1) % 10);
    }

    return (
        <DatabaseContext.Provider value = {{counter, signIn, signOut}}>
            {children}
        </DatabaseContext.Provider>
    );
}
