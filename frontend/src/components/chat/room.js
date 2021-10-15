import data from "../../services/data-service";
import {useEffect, useState} from "react";

export default function Room(username) {

    const [picture, setPicture] = useState("/images/profilepic.jpg");

    useEffect(() => {
        data.getUser(username).then(res => {
            if (res) {
                setPicture(res.photo);
            }
        })
    }, [username])


    return (
        <div className="chatroom">
            <div className="chatroom-image-container">
                <img src={picture} alt="avatar"/>
            </div>
            <div className="chatroom-text-container">
                <b>{username}</b>
            </div>
        </div>
    )

}
