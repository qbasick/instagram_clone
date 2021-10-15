import ChatroomList from "./chatroom-list";
import ChatDialog from "./chat-dialog";
import "../../styles/chat.css";

export default function ChatWindow() {
    return (
        <div className="chat-main-container">
            <ChatroomList/>
            <ChatDialog/>
        </div>
    );
}
