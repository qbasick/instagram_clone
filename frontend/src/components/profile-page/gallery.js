import {useEffect, useState} from "react";
import data from "../../services/data-service";
import {IMAGE_SRC} from "../../constants/endpoints";
import "../../styles/profile.css";
import {Link} from "react-router-dom";
import GalleryCell from "./gallery-cell";

export default function Gallery({user}) {

    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(0);
    // strange react behaviour
    useEffect(() => {
        setPhotos([]);
        setPage(0);
        data.loadUserPosts(user.username, 0)
            .then((res) => {
                if (res && res.length > 0) {
                    setPhotos(res);
                    setPage(page => page + 1);
                }
            });
    }, [user]);


    const loadMorePosts = () => {
        data.loadUserPosts(user.username, page)
            .then((res) => {
                if (res && res.length > 0) {
                    setPhotos((photos) => [...photos, ...res]);
                    setPage(page => page + 1);
                }
            });
    }


    return (
        <div className="gallery-container">
            <div></div>
            {photos.length > 0 ?
                <div className="gallery-grid">
                    {photos.map(photo => (
                        <GalleryCell key={photo.id} photo={photo}/>
                    ))}
                </div>  : <p>No publications yet!</p>}
            {photos.length > 0 ?
                <button type="button"
                        onClick={loadMorePosts}>
                    Load more posts
                </button>
                : null}
        </div>
    );
}
