import data from "../../services/data-service";
import {useContext, useEffect, useRef, useState} from "react";
import UserContext from "../../context/user";
import {formatDistance} from "date-fns";

export default function Footer({likeCount, postId, comments, setComments, createdAt}) {
    const [toggleLiked, setToggledLike] = useState(false);
    const [likes, setLikes] = useState(likeCount);
    const [comment, setComment] = useState("");
    const {userDetails} = useContext(UserContext);
    const commentInput = useRef(null);

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

    const handleFocus = () => {
        commentInput.current.focus();
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        data.postComment(postId, comment)
            .then((res) => {
                if (res) {
                    const commentDto = {
                        id: +res,
                        postId: postId,
                        username: userDetails.username,
                        userPhoto: userDetails.photo,
                        text:comment,
                        createdAt: Date.now()
                    };
                    setComments((comments) => [commentDto, ...comments]);
                }
            }).finally(() => setComment(""));
    }

    return (
        <div className="post-page-footer-container">
            <div className="post-page-actions-container">
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
            <div style={{marginLeft:"1rem"}}>
                <p><b>{likes}</b> users liked this post!</p>
            </div>
            <div>
                <p style={{marginLeft:'1rem', fontSize:'small', color:'gray'}}>
                    {formatDistance(new Date(createdAt), Date.now())} ago
                </p>
            </div>
            <div className="post-page-comment-form-container">
                <form method="POST"
                      onSubmit={(event) => comment.length > 0 ? handleCommentSubmit(event) : event.preventDefault()}
                >
                    <input
                        aria-label="Add a comment"
                        autoComplete="off"
                        className="post-page-comment-input"
                        type="text"
                        name="add-comment"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={({target}) => setComment(target.value)}
                        ref={commentInput}
                    />
                    <button type="button"
                            className="post-page-comment-button"
                            disabled={comment.length < 1}
                            onClick={handleCommentSubmit}>
                        Post
                    </button>
                </form>

            </div>
        </div>
    );
}
