import "../styles/timeline.css";
import UserContext from "../context/user";
import {useContext} from "react";
import usePhotos from "../hooks/use-photos";
import Skeleton from "react-loading-skeleton";
import Post from "./post-timeline";
import ReactLoader from "./loader";

export default function Timeline() {
    const {userDetails} = useContext(UserContext);
    const {photos} = usePhotos(userDetails?.username);


    return (
        <div className="timeline-container">
            {photos.length === 0 ?
                (<Skeleton count={4} width={640} height={500}/>)
                :
                photos.map((photo) => <Post key={photo.id} data={photo}/>)
            }
        </div>
    );
}
