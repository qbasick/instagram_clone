import {Link} from "react-router-dom";

export default function SearchBarProfile({username, photo, description}) {
    return (
        <div>
            <Link to={`/u/${username}`}>
                <div className="searchbar-profile-container">
                    <img
                        src={"http://localhost:8080/api/files/" + photo}
                        alt="user image"
                        onError={(e) => {
                            e.target.src = `/images/profilepic.jpg`;
                        }}
                    />
                    <div>
                        <p><b>{username}</b></p>
                        <p style={{color: "gray"}}>
                            {description.length > 24
                                ? description.substring(0, 24) + "..."
                            : description}
                        </p>
                    </div>

                </div>
            </Link>
        </div>
    )
}
