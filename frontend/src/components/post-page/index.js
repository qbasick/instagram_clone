import "../../styles/bigpost.css";
import {IMAGE_SRC} from "../../constants/endpoints";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import Header from "./header";
import Comments from "./comments";
import Footer from "./footer";
import {isVideoRef} from "../../helpers/video-handling";

export default function BigPost({post}) {

    const [data, setData] = useState(post);
    const [comments, setComments] = useState([]);

    const [video, setVideo] = useState(false);

    useEffect(() => {
        if (post) {
            setData(post);
            if (isVideoRef(post.photo)) {
                setVideo(true);
            }
        }
    }, [post]);

    return (
        data ?
            <div className="big-post-container">
                <div className="big-post-image-container">
                    {video ?
                        <video src={IMAGE_SRC + "videos/" + data.photo} controls/>
                               :
                        <img src={IMAGE_SRC + data.photo} alt={data.caption}/>
                    }
                </div>
                <div className="big-post-text-container">
                    <Header username={data.author} avatar={data.authorPhoto}/>
                    <Comments postId={data.id}
                              postDate={data.createdAt}
                              author={data.author}
                              authorPhoto={data.authorPhoto}
                              caption={data.caption}
                              comments={comments}
                              setComments={setComments}
                    />
                    <Footer comments={comments}
                            setComments={setComments}
                            likeCount={data.likeCount}
                            postId={data.id}
                            createdAt={data.createdAt}
                    />
                </div>
            </div>
            :
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Skeleton width='50vw' height='80vh'/>
            </div>
    )

}
