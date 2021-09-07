import {Link} from "react-router-dom";
import {IMAGE_SRC} from "../../constants/endpoints";

export default function Header({username, avatar}) {


    return (
        <div className="post-header-container">
            <div className="post-header-links">
                <Link to={`/u/${username}`}>
                    <img src={IMAGE_SRC + avatar} alt="user avatar"/>
                </Link>
                <p><b>{username}</b></p>
            </div>
        </div>
    );
}
