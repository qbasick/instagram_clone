import Header from "./header";
import Gallery from "./gallery";
import data from "../../services/data-service"
import {useEffect, useState} from "react";


export default function ProfilePage({user}) {
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        data.getFollowers(user.username)
            .then((res) => {
                if (res) {
                    setFollowers(res);
                }
            });
        data.getFollowing(user.username)
            .then((res) => {
                if (res) {
                    setFollowings(res);
                }
            });
    }, [user]);

    return (
        <div>
            <Header user={user} followers={followers} followings={followings}/>
            <Gallery user={user}/>
        </div>
    )
}
