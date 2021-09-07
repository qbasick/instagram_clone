import {Link} from "react-router-dom";
import "../../styles/profile.css";

export default function FollowProfile({username, photo, description}) {

    return (
        <Link to={`/u/${username}`}>
            <div className="follow-profile-container">
                <img
                    src={"http://localhost:8080/api/files/" + photo}
                    alt="user image"
                    onError={(e) => {
                        e.target.src = `/images/profilepic.jpg`;
                    }}
                />
                <div>
                    <p><b>{username}</b></p>
                    <p>{description}</p>
                </div>

            </div>
        </Link>
    );
}
