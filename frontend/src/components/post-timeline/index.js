import Header from "./header";
import Image from "./Image";
import Footer from "./footer";
import Comments from "./comments";
import Actions from "./actions";
import {useRef} from "react";
export default function Post({data}) {
     const {id, photo, caption, author, authorPhoto, likeCount, commentCount, createdAt} = data;
     const commentInput = useRef(null);
     const handleFocus = () => commentInput.current.focus();

     return (
         <div className="post-container">
             <Header username={author} avatar={authorPhoto}/>
             <Image source={photo} postId={id}/>
             <Actions likeCount={likeCount} commentCount={commentCount} postId={id} handleFocus={handleFocus}/>
             <Footer username={author} caption={caption}/>
             <Comments commentInput={commentInput} postId={id}/>
         </div>
     )
}
