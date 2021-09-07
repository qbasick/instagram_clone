import {useState} from "react";
import DatabaseContext from "../context/database";
import {login, logout} from "../services/auth-service";

export function AuthProvider({children}) {

    const [counter, setCounter] = useState(0);

    const signIn = (username, password) => {
        login(username, password).then(() => setCounter((counter + 1) % 10));
    }

    const signOut = () => {
        logout();
        setCounter((counter + 1) % 10);
    }

    return (
        <DatabaseContext.Provider value = {{counter, signIn, signOut}}>
            {children}
        </DatabaseContext.Provider>
    );
}
