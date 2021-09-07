import Header from "../components/header";
import ProfilePage from "../components/profile-page";
import {useParams, useHistory} from "react-router";
import data from "../services/data-service";
import {useEffect, useState} from "react";
import * as ROUTES from '../constants/routes';


export default function Profile() {

    const {username} = useParams();
    const history = useHistory();
    const [user, setUser] = useState(null);

    useEffect(() => {
        data.getUser(username).then((res) => {
            if (res) {
                setUser(res);
            } else {
                history.push(ROUTES.NOT_FOUND);
            }
        })
    }, [username]);

    return user ? (
       <div>
           <Header/>
           <ProfilePage user={user}/>
       </div>
    ) : null;
}
