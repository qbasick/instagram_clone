import {useState, useEffect, useContext} from 'react';
import DatabaseContext from "../context/database";

export default function useAuthListener() {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const {counter} = useContext(DatabaseContext);
    useEffect(() => {
        const listener = () => {
            setUser(localStorage.getItem('user'));
        };
        return () => listener();
    }, [counter]);

    return {user};
}
