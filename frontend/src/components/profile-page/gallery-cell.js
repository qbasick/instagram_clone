import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {IMAGE_SRC} from "../../constants/endpoints";
import {createSnapshotFromVideo, isVideoRef} from "../../helpers/video-handling";

export default function GalleryCell(props) {

    const [src, setSrc] = useState(IMAGE_SRC + props.photo.photo);

    useEffect(() => {
        if (isVideoRef(props.photo.photo)) {
            console.log("yes");
            createSnapshotFromVideo(setSrc, props.photo.photo);
        }
    }, []);

    return <Link to={`/p/${props.photo.id}`}>
        <div className="gallery-cell">
            <img src={src} alt={props.photo.caption}/>
            <div className="gallery-cell-hover">
                <p className="gallery-cell-hover-content">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {props.photo.likeCount}
                </p>

                <p className="gallery-cell-hover-content">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {props.photo.commentCount}
                </p>
            </div>
        </div>
    </Link>;
}
