import ChatroomList from "./chatroom-list";
import ChatDialog from "./chat-dialog";
import "../../styles/chat.css";
import {useState} from "react";

export default function ChatWindow({dialogTo}) {

    const [conversation, setConversation] = useState(null);
    const [chat, setChat] = useState(null);


    return (
        <div className="chat-main-container">
            <ChatroomList setConversation={setConversation} setChat={setChat} dialogTo={dialogTo}/>
            <ChatDialog username={conversation} chatId={chat}/>
        </div>
    );
}
