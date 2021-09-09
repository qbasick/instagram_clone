import {useState} from "react";
import data from "../../services/data-service"
import {Link} from "react-router-dom";
import "../../styles/sidebar.css";

export default function SuggestedProfile({username, photo, description}) {
    const [followed, setFollowed] = useState(false);

    async function handleFollow() {
        await data.toggleFollow(username).then((res) => {if (res) {
            setFollowed(true);
        }});
    }

    return !followed ? (
        <div className="suggested-profile-container">
            <div className="suggested-profile-details-container">
                <Link to={`/u/${username}`}>
                <img
                    src={"http://localhost:8080/api/files/" + photo}
                    alt="user image"
                    onError={(e) => {
                        e.target.src = `/images/profilepic.jpg`;
                    }}
                />
                </Link>
                <Link to={`/u/${username}`}>
                    <p><b>{username}</b></p>
                    <p>{description.length > 24
                        ? description.substring(0, 24) + "..."
                        : description}</p>
                </Link>
            </div>
            <button
                type="button"
                onClick={handleFollow}
            >
                Follow
            </button>
        </div>
    ) : null;
}
