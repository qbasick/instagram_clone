import data from "../../services/data-service";
import {useContext, useEffect, useRef, useState} from "react";
import {IMAGE_SRC} from "../../constants/endpoints";
import UserContext from "../../context/user";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

export default function ChatDialog({username, chatId}) {
    const [messages, setMessages] = useState([]);
    const [image, setImage] = useState("");
    const [text, setText] = useState("");
    const {userDetails} = useContext(UserContext);
    const ref = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior:'smooth'});
    }
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (chatId && username && userDetails) {
            data.loadChatMessages(chatId).then(res => {
                if (res) {
                    setMessages([...res]);
                }
            });

            data.getUser(username).then(res => {
                if (res) {
                    setImage(res.photo);
                }
            })

            const socket = new SockJS("http://localhost:8080/websocket");
            ref.current = Stomp.over(socket);
            ref.current.connect({Authorization: 'Bearer ' + localStorage.getItem('token')}, function (frame) {
                console.log("connected " + frame);
                if (ref.current.connected) {
                    ref.current.subscribe("/user/" + userDetails.username + "/queue/messages",
                        (data) => {
                            let message = JSON.parse(data.body);
                            if (message.author === username) {
                                setMessages(messages => [...messages, message]);
                            }
                        })
                }
            });

            return () => {
                try {
                    ref.current.unsubscribe("/user/" + userDetails.username + "/queue/messages");
                    ref.current.disconnect(() => {
                        console.log("disconnected")
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }

    }, [username, chatId, userDetails]);

    function sendMessage() {
        ref.current.send("/app/chat", {}, JSON.stringify({'payload': text, 'recipient': username}));
        setMessages(messages => [...messages, {
            author: userDetails.username,
            payload: text,
            chatRoomId: chatId,
            createdAt: new Date(Date.now()).toISOString()
        }]);
        setText("");
    }

    return (
        username != null && chatId != null ?
        <div className="chat-dialog-container">
            <div className="chat-dialog-header">
                <div className="chat-dialog-image-container">
                    <img src={IMAGE_SRC + image}
                         alt="avatar"
                         onError={(event) => event.target.src = "/images/profilepic.jpg"}/>
                </div>
                <div className="chatroom-text-container">

                </div>
            </div>
            <div className="chat-dialog-text-area">
                {messages.map(message =>
                    <div key={Date.parse(message.createdAt)}
                         className={message.author === username
                             ? "chat-dialog-message-position"
                             : "chat-dialog-message-position right"}>
                        <div className="chat-dialog-message">
                            <b>{message.author}</b>
                            <p>{message.payload}</p>
                            <b>{new Date(message.createdAt).toLocaleString("ru-RU" )}</b>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef}/>
            </div>
            <div className="chat-dialog-footer">
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="chat-dialog-input"
                    type="text"
                    name="add-comment"
                    placeholder="Type a message"
                    value={text}
                    onChange={({target}) => setText(target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && text.length > 0) {
                            sendMessage();
                        }}
                    }
                />
                <button
                    type="button"
                    className="chat-dialog-button"
                    disabled={text.length < 1}
                    onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
        :null
    );
}
