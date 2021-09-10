import {useState, useEffect, useContext} from 'react';
import DatabaseContext from "../context/database";

export default function useAuthListener() {
    const [user, setUser] = useState(/*localStorage.getItem('user')*/null);
    const {counter} = useContext(DatabaseContext);

    useEffect(() => {
        setUser(localStorage.getItem('user'));
    }, [counter, user]);

    return {user};
}
