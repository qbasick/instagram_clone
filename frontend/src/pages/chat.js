import Header from "../components/header";
import ChatWindow from "../components/chat";
import {useEffect} from "react";

export default function Chat() {

    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const id = urlParams.get('id');

    useEffect(() => {
        window.history.pushState("", "", "/chat")
    }, [])

    return (
        <>
            <Header/>
            <ChatWindow dialogTo={id}/>
        </>
    )
}
