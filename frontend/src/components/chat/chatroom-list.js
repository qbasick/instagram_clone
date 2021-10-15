import data from "../../services/data-service";
import {useEffect, useContext, useState, useRef} from "react";
import UserContext from "../../context/user";
import Room from "./room";


export default function ChatroomList({setChat, setConversation, dialogTo}) {


    const [rooms, setRooms] = useState([]);
    const {userDetails} = useContext(UserContext);
    const [active, setActive] = useState();

    useEffect(() => {
        if (userDetails) {
            data.loadChatRooms().then(res => {
                if (res) {
                    setRooms([...res]);
                }
            })
        }
    }, [userDetails]);


    useEffect(() => {
        let found = false;
        if (dialogTo && dialogTo !== userDetails?.username) {
            for (let room of rooms) {
                if (room.first === dialogTo || room.second === dialogTo) {
                    setConversation(dialogTo);
                    setChat(room.id);
                    found = true;
                    break;
                }
            }
            if (!found) {
                setConversation(dialogTo);
                setRooms(rooms => [...rooms, {id: -1, first: dialogTo, second: userDetails?.username}])
            }
        }
    }, [rooms])


    return (
        userDetails ?
            <div className="chatrooms-module">
                <div className="chatrooms-header">
                    <b>Dialog list</b>
                </div>
                <div className="chatrooms-list-container">
                    {rooms.map(room =>
                        <Room
                            room={room.id}
                            setChat={setChat}
                            setConversation={setConversation}
                            key={room.id}
                            active={room.id === active}
                            setActive={setActive}
                            username={userDetails.username === room.second ? room.first : room.second}
                        />)}
                </div>
            </div>
            : null
    );
}
