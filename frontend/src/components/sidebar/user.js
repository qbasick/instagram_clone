import UserContext from "../../context/user";
import {useContext, useEffect, useState} from "react";
import data from "../../services/data-service";
import Skeleton from 'react-loading-skeleton';
import {Link} from "react-router-dom";
export default function User() {
    const {userDetails} = useContext(UserContext);

    return (
        !userDetails ?
            (<Skeleton count={1} height={61}/>)
            :
            (
                <Link to={`/u/${userDetails.username}`}>
                    <div className="sidebar-userdetails-container">
                    <div className="sidebar-picture-container">
                        <img src={"http://localhost:8080/api/files/" + userDetails.photo}
                             alt="user avatar"
                             onError={(event) => event.target.src = "/images/profilepic.jpg"}/>
                    </div>
                    <div className="sidebar-userinfo-container">
                        <h1>{userDetails.username}</h1>
                        <p>{userDetails.description}</p>
                    </div>
                    </div>
                </Link>
            )
    )
}
