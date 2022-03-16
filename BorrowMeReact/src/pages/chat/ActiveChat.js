import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import InputEmoji from "react-input-emoji";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatMessage from "./ChatMessage";
import {getData} from "../../services/apiFetch";

const ActiveChat = ({connection}) => {
    const [messageInput, setMessageInput] = useState("");
    const [allFetchedMessages, setAllFetchedMessages] = useState([]);

    const latestMessages = useRef(null);
    latestMessages.current = allFetchedMessages;

    const chatData = useSelector(state => state.activeChatWindow.value);
    const [lastMessageTime, setLastMessageTime] = useState(null);

    const messagesContainer = useRef();

    useEffect(() => {
        if (allFetchedMessages.length === 0) {
            console.log("fetching messages")
            getData(`/api/messages/reservations/${chatData.reservationId}`)
                .then(data => {
                    if (data === "Not Found") {
                        return;
                    }
                    let messages = getMessagesWithCorrectTime(data.messages)
                    setAllFetchedMessages(messages);
                })
        }
    }, [])

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
                        setAllFetchedMessages(updatedLatestMessages);
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection]);

    const getMessagesWithCorrectTime = (messages) => {
        messages[0].sendTime = getTimeObject(messages[0].sendTime);
        messages[0].shownTime = `${messages[0].sendTime.date} ${messages[0].sendTime.time}`;
        let lastMessageTime = messages[0].sendTime;
        for (let i = 1; i < messages.length; i++) {
            console.log(messages[i].sendTime)
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

    const updateLastMessageTime = (lastMessageTime) => {
        setLastMessageTime(lastMessageTime);
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

    const handleMessageSubmit = async () => {
        let newMessage = {
            text: messageInput,
            senderId: chatData.senderId,
            receiverId: chatData.receiverId,
            reservationId: chatData.reservationId
        }
        if (connection) {
            await connection.send("SendMessageToUser", newMessage);
        }
        setMessageInput("");
    }
    useEffect(() => {
        messagesContainer.current.scrollTo({top: messagesContainer.current.scrollHeight, behavior: 'smooth'});
    }, [allFetchedMessages])
    return (
        <div id="active-chat-container" className="d-flex flex-column justify-content-end h-100">
            <div id="active-chat-messages-container" className="d-flex flex-column my-4 h-100 p-4"
                 ref={messagesContainer}>
                {allFetchedMessages && allFetchedMessages.map(message =>
                    <ChatMessage key={message.id} message={message} lastMessageTime={lastMessageTime}
                                 updateLastMessageTime={updateLastMessageTime}/>
                )}
            </div>

            <form onSubmit={handleMessageSubmit} className="d-flex justify-content-center w-100 mb-3">
                <div id="chat-input-container" className="d-flex">
                    <InputEmoji value={messageInput} onChange={setMessageInput} placeholder=""
                                onEnter={handleMessageSubmit}/>
                    <div className="d-flex align-items-center cursor-pointer px-2" onClick={handleMessageSubmit}>
                        <SendRoundedIcon sx={{fontSize: 30, color: "#989898"}}/>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default ActiveChat;
