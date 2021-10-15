import {useContext, useEffect, useState} from "react";
import {IMAGE_SRC} from "../../constants/endpoints";
import data from "../../services/data-service";
import Modal from "../modal/modal";
import UserContext from "../../context/user";
import FollowProfile from "./follow-profile";
import {useHistory} from "react-router-dom";



export default function Header({user, followers, followings}) {

    const [displayFollowers, setDisplayFollowers] = useState(false);
    const [displayFollowings, setDisplayFollowings] = useState(false);
    const [postCount, setPostCount] = useState(0);
    const [follow, setFollow] = useState(false);
    const {userDetails} = useContext(UserContext);
    const history = useHistory();


    useEffect(() => {
        document.title = user.username + " " + user.description;
        data.getPostCount(user.username)
            .then((res) => {
                if (res) {
                    setPostCount(res);
                }
            });
        setDisplayFollowers(false);
        setDisplayFollowings(false);
    }, [user]);


    useEffect(() => {
        if (userDetails && followers.some((follower) => follower.username === userDetails.username)) {
            setFollow(true);
        } else {
            setFollow(false);
        }
    }, [followers]);

    return (
        <>
            <Modal active={displayFollowers} setActive={setDisplayFollowers}>
                <div className="profile-list-container">
                {followers.map(follower => <FollowProfile
                    key={follower.username}
                    username={follower.username}
                    description={follower.description}
                    photo={follower.photo}/>)}
                </div>
            </Modal>
            <Modal active={displayFollowings} setActive={setDisplayFollowings}>
                <div className="profile-list-container">
                {followings.map(follower => <FollowProfile
                    key={follower.username}
                    username={follower.username}
                    description={follower.description}
                    photo={follower.photo}/>)}
                </div>
            </Modal>
        <div className="profile-header-container">
            <div className="profile-header-picture">
                <div className="image-border">
                    <img src={IMAGE_SRC + user.photo}
                         alt="User photo"
                         onError={(event) => event.target.src = "/images/profilepic.jpg"}
                    />
                </div>
            </div>
            <div className="profile-header-text">
                <div>
                    <p>{user.username}</p>
                    {! (userDetails && userDetails.username === user.username) ?
                        <button type="button"
                                onClick={() => {
                                    if (user) {
                                        data.toggleFollow(user.username).then((res) => {
                                            if (res) {
                                                setFollow((follow) => !follow);
                                            }
                                        });
                                    }
                                }}>
                            {!follow ? "Follow" : "Unfollow"}
                        </button>
                     : null}
                     <button type="button"
                             style={{marginLeft: "1em"}}
                        onClick={() => history.push("/chat?id=" + user.username)}>
                        Direct
                     </button>
                </div>
                <div>
                    <p><b>{postCount}</b> publications</p>
                    <p onClick={setDisplayFollowers} style={{cursor: 'pointer'}}>
                        <b>{followers.length}</b> followers
                    </p>
                    <p onClick={setDisplayFollowings} style={{cursor: 'pointer'}}>
                        <b>{followings.length}</b> followings
                    </p>
                </div>
                <div>
                    <p>{user.description}</p>
                </div>
            </div>
        </div>
        </>
    );
}
