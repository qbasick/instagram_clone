import data from "../../services/data-service";
import {useEffect, useRef, useState} from "react";
import {IMAGE_SRC} from "../../constants/endpoints";

export default function Room({setChat, setConversation, username, room, active, setActive}) {

    const [picture, setPicture] = useState("");
    const elem = useRef(null);

    useEffect(() => {
        data.getUser(username).then(res => {
            if (res) {
                setPicture(res.photo);
            }
        })
    }, [username])

    function handleClick() {
        setChat(room);
        setConversation(username);
        setActive(room);
    }


    return (
        <div onClick={handleClick} className={active ? "chatroom active" : "chatroom"}>
            <div className="chatroom-image-container">
                <img src={IMAGE_SRC + picture}
                     alt="avatar"
                     onError={(event) => event.target.src = "/images/profilepic.jpg"}/>
            </div>
            <div className="chatroom-text-container">
                <b>{username}</b>
            </div>
        </div>
    )

}
