import {useSelector} from "react-redux";
import ActiveChat from "./ActiveChat";
import InactiveChat from "./InactiveChat";
import {useEffect, useState} from "react";
import {HubConnectionBuilder} from "@microsoft/signalr";

const ChatWindow = () => {
    const isChatActive = useSelector(state=>state.activeChatWindow.value).isActive;

    const [connection, setConnection] = useState(null);

    useEffect(async () => {
        await fetch("/authentication/token",{
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(response => response.text())
            .then(token =>{
                const newConnection = new HubConnectionBuilder()
                    .withUrl(`https://localhost:7058/chat`, {accessTokenFactory: () => token})
                    .withAutomaticReconnect()
                    .build();
                setConnection(newConnection);
            })
    }, []);
    return (
        <div id="chat-window-container">
            {isChatActive ?
                <ActiveChat connection={connection}/>
                :
                <InactiveChat />
            }
        </div>
    );
};

export default ChatWindow;
