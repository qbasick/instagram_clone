import data from "../../services/data-service";
import {useContext, useState} from "react";
import UserContext from "../../context/user";

export default function AddComment({commentInput, postId, comments, setComments}) {
    const [comment, setComment] = useState("");
    const {userDetails} = useContext(UserContext);

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
        <div className="post-comment-form-container">
            <form method="POST"
                  onSubmit={(event) => comment.length > 0 ? handleCommentSubmit(event) : event.preventDefault()}
            >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="post-comment-input"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({target}) => setComment(target.value)}
                    ref={commentInput}
                />
                <button type="button"
                        className="post-comment-button"
                    disabled={comment.length < 1}
                    onClick={handleCommentSubmit}>
                    Post
                </button>
            </form>

        </div>
    );
}
