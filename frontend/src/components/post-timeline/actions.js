import {useEffect, useState} from "react";
import data from "../../services/data-service";

export default function Actions({likeCount, postId, handleFocus, commentCount}) {

    const [toggleLiked, setToggledLike] = useState(false);
    const [likes, setLikes] = useState(likeCount);

    useEffect(() => {
        data.isPostLikedByUser(postId).then((res) => setToggledLike(res));
    }, []);

    const handleToggleLiked = () => {
        data.toggleLike(postId).then((res) => {
            if (res) {
                setToggledLike((toggleLiked) => !toggleLiked);
                if (!toggleLiked) {
                    setLikes(likes => likes + 1);
                } else {
                    setLikes(likes => likes - 1);
                }
            }
        });
    }

    return (
        <>
        <div className="post-actions-container">
            <svg
                onClick={handleToggleLiked}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handleToggleLiked();
                    }
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                tabIndex={0}
                className={`like-svg ${
                    toggleLiked ? 'filled-like' : 'unfilled-like'
                }`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
            <svg
                onClick={handleFocus}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handleFocus();
                    }
                }}
                className="comments-svg"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                tabIndex={0}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
                >
            </svg>
        </div>
        <div className="post-actions-number-display">
            <p>{likes}</p>
            <p>{commentCount}</p>
        </div>
    </>
    );
}
