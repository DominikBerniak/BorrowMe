import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import InputEmoji from "react-input-emoji";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatMessage from "./ChatMessage";
import {getData} from "../../services/apiFetch";
import Spinner from "../../components/Spinner";

const ActiveChat = ({connection, updateFetchedMessages}) => {
    const [messageInput, setMessageInput] = useState("");

    const chatData = useSelector(state => state.activeChatWindow.value);
    const allFetchedMessages = useSelector(state=>state.activeChatFetchedMessages.value);
    const [isFetchingMessages, setIsFetchingMessages] = useState(false);

    const messagesContainer = useRef();

    useEffect(() => {
        if (!isFetchingMessages) {
            setIsFetchingMessages(true);
            console.log("fetching messages")
            getData(`/api/messages/reservations/${chatData.reservationId}`)
                .then(data => {
                    if (data === "Not Found") {
                        setIsFetchingMessages(false);
                        return;
                    }
                    updateFetchedMessages(data.messages)
                    setIsFetchingMessages(false);
                })
        }
    }, [chatData])

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
                {!isFetchingMessages ?
                    allFetchedMessages.length > 0 ?
                        allFetchedMessages.map(message =>
                            <ChatMessage key={message.id} message={message}/>)
                        :
                        <div className="d-flex flex-column user-select-none align-items-center">
                            <div className="h5">Porozmawiaj z użytkownikiem {chatData.receiverFullName}</div>
                            <div>w celu omówienia warunków wymiany.</div>
                        </div>
                    :
                    <Spinner />
                }
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
