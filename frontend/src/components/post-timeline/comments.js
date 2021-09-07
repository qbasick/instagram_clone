import {useEffect, useState} from "react";
import data from "../../services/data-service";
import {IMAGE_SRC} from "../../constants/endpoints";
import {formatDistance} from "date-fns";
import {Link} from "react-router-dom";
import AddComment from "./add-comment";

export default function Comments({postId, commentInput}) {

    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(false);
    /*
    useEffect(() => {
        data.loadCommentsToPost(postId, currentPage).then((res) => {
            if (res.length > 0) {
                setComments((comments) => [...comments, ...res]);
                setCurrentPage((currentPage) => currentPage + 1);
            }
        })
    }, []);*/

    useEffect(() => {
        if (fetching) {
            data.loadCommentsToPost(postId, currentPage).then((res) => {
                if (res.length > 0) {
                    setComments((comments) => [...new Map([...comments, ...res]
                        .map((comment) => [comment.id, comment])).values()]
                    );
                    setCurrentPage((currentPage) => currentPage + 1);
                }
            }).finally(() => {setFetching((fetching) => false); console.log(comments)});
        }
    }, [fetching]);

    const loadMoreComments = () => {
        setFetching(true);
    };

    return (
        <>
            <div className="post-comment-section">
                {comments.map((comment) => (
                    <div key={comment.id} className="post-comment-container">
                        <div className="post-comment-body">
                            <div>
                                <Link to={`/u/${comment.username}`}>
                                    <img src={IMAGE_SRC + comment.userPhoto}/>
                                </Link>
                            </div>
                            <div>
                                <p><Link to={`/u/${comment.username}`}><b>{comment.username}</b>  </Link>{comment.text}</p>
                            </div>
                        </div>
                        <div className="post-comment-footer">
                            <p>{formatDistance(new Date(comment.createdAt), Date.now())} ago</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="load-comments-button"
                onClick={loadMoreComments}
                type="button">
                Load more comments
            </button>
            <AddComment commentInput={commentInput}
                        postId={postId}
                        comments={comments}
                        setComments={setComments}
            />
        </>
    );
}
