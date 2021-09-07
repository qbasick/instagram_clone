import {IMAGE_SRC} from "../../constants/endpoints";
import {Link} from "react-router-dom";
import {isVideoRef} from "../../helpers/video-handling";
import {useState} from "react";

export default function Image({source,postId}) {

    const [video, setVideo] = useState(isVideoRef(source));

    return (
            video ?
            <video src={IMAGE_SRC + "videos/" + source} controls width="100%"/>
                :
            <Link to={`/p/${postId}`}>
                <img className="post-main-image" src={IMAGE_SRC + source} alt="post image"/>
            </Link>
    )
}
