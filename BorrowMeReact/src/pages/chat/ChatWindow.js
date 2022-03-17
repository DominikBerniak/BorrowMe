import {useDispatch, useSelector} from "react-redux";
import ActiveChat from "./ActiveChat";
import InactiveChat from "./InactiveChat";
import {useEffect, useRef, useState} from "react";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {clearActiveChatWindow} from "../../features/activeChatWindow";
import {changeActiveChatFetchedMessages} from "../../features/activeChatFetchedMessages";


const ChatWindow = () => {
    const isChatActive = useSelector(state=>state.activeChatWindow.value).isActive;
    const dispatch = useDispatch();

    const [connection, setConnection] = useState(null);

    const allFetchedMessages = useSelector(state=>state.activeChatFetchedMessages.value);

    const latestMessages = useRef(null);
    latestMessages.current = allFetchedMessages;

    useEffect(async () => {
        dispatch(clearActiveChatWindow());
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

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on("ReceivePrivateMessage", (fetchedMessage) => {
                        const updatedLatestMessages = [...latestMessages.current];
                        fetchedMessage.sendTime = getTimeObject(fetchedMessage.sendTime);
                        let message = getMessageWithCorrectTime(fetchedMessage, updatedLatestMessages);
                        updatedLatestMessages.push(message);
                        dispatch(changeActiveChatFetchedMessages(updatedLatestMessages));
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection]);

    useEffect(()=>{
        console.log("new message")
    },[allFetchedMessages])

    const getMessagesWithCorrectTime = (messages) => {
        messages[0].sendTime = getTimeObject(messages[0].sendTime);
        messages[0].shownTime = `${messages[0].sendTime.date} ${messages[0].sendTime.time}`;
        let lastMessageTime = messages[0].sendTime;
        for (let i = 1; i < messages.length; i++) {
            messages[i].sendTime = getTimeObject(messages[i].sendTime);

            if (lastMessageTime.date !== messages[i].sendTime.date) {
                messages[i].shownTime = `${messages[i].sendTime.date} ${messages[i].sendTime.time}`;
            } else if (lastMessageTime.time !== messages[i].sendTime.time) {
                messages[i].shownTime = messages[i].sendTime.time;
            } else {
                messages[i].shownTime = null;
            }
            lastMessageTime = messages[i].sendTime;
        }
        return messages;
    }

    const getMessageWithCorrectTime = (message, latestMessages) => {
        if (latestMessages[latestMessages.length - 1].sendTime.date !== message.sendTime.date) {
            message.shownTime = `${message.sendTime.date} ${message.sendTime.time}`;
        } else if (latestMessages[latestMessages.length - 1].sendTime.time !== message.sendTime.time) {
            message.shownTime = message.sendTime.time;
        } else {
            message.shownTime = null;
        }
        return message;
    }
    const getTimeObject = (dateTimeString) => {
        let dateArray = dateTimeString.split("T");
        let date = dateArray[0];
        let time = dateArray[1].substring(0, 5)
        return {
            date: date,
            time: time
        }
    }
    const updateFetchedMessages = (messagesData) => {
        let messages = getMessagesWithCorrectTime(messagesData)
        dispatch(changeActiveChatFetchedMessages(messages));
    }

    return (
        <div id="chat-window-container">
            {isChatActive ?
                <ActiveChat connection={connection} updateFetchedMessages={updateFetchedMessages}/>
                :
                <InactiveChat />
            }
        </div>
    );
};

export default ChatWindow;
