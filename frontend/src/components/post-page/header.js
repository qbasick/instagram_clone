import {Link} from "react-router-dom";
import {IMAGE_SRC} from "../../constants/endpoints";
import UserContext from "../../context/user";
import {useContext, useEffect, useState} from "react";
import data from "../../services/data-service";


export default function Header({username, avatar}) {

    const [follow, setFollow] = useState(false);
    const {userDetails} = useContext(UserContext);

    useEffect(() => {
         if (userDetails) {
             data.isUserFollowedByMe(username, userDetails).then(res => setFollow(res));
         }
    },  [username]);

    const handleToggle = () => {
        data.toggleFollow(username).then((res) => setFollow(follow => res && !follow));
    }

    return (
        <div className="post-page-header-container">
            <div className="post-page-header-links">
                <Link to={`/u/${username}`}>
                    <img src={IMAGE_SRC + avatar} alt="user avatar"/>
                </Link>
                <p><b>{username}</b></p>
            </div>
            {userDetails?.username !== username ?
                <button type="button"
                        onClick={handleToggle}>
                    {follow ? "Unfollow" : "Follow"}
                </button>
                : null
            }
        </div>
    );
}
