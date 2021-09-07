import data from "../../services/data-service";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../context/user";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./suggested-profile";

export default function Suggestions() {

    const {userDetails} = useContext(UserContext);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        if (userDetails) {
            data.getSuggestions().then((res) => {
                console.log(res);
                if (res.length > 0) {
                    setProfiles((profiles) => [...res]);
                }
            })
        }
    }, [userDetails]);

    return !profiles ?
        (<Skeleton count={1} height={61}/>)
        : profiles.length > 0 ? (
            <div className="suggestions-container">
                <div className="suggestions-text-container">
                    <p>
                        Profiles you might be interested in:
                    </p>
                </div>
                <div className="suggestions-profilelist-container">
                    {profiles.map((profile) =>
                        <SuggestedProfile
                            key={profile.username}
                            username={profile.username}
                            description={profile.description}
                            photo={profile.photo}
                        />)}
                </div>
            </div>
        ) : null;
}
