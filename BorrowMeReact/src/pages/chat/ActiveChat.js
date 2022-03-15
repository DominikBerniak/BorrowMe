import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import InputEmoji from "react-input-emoji";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ChatMessage from "./ChatMessage";

const ActiveChat = ({connection}) => {
    const [message, setMessage] = useState("");
    const [allFetchedMessages, setAllFetchedMessages] = useState([]);

    const chatData = useSelector(state=>state.activeChatWindow.value);

    const messagesContainer = useRef();



    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on("ReceiveMessage", (message) => {
                        setAllFetchedMessages(prev => [...prev, message]);
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection]);

    const handleMessageSubmit = async => {
        // if (connection)
        // {
        //     await connection.send("SendMessageToUser", message, chatData.receiverEmail);
        // }
        let today = new Date();
        const currentTime = [today.getHours(), today.getMinutes()].map((a)=>(a < 10 ? '0' + a : a)).join(":");
        let newMessage = {
            text: message,
            from: "dominik@gmail.com",
            to: "notMe@gmail.com",
            time: currentTime
        }
        setAllFetchedMessages(prev => [...prev, newMessage]);
        setMessage("");
    }
    useEffect(()=>{
        messagesContainer.current.scrollTo({ top: messagesContainer.current.scrollHeight, behavior: 'smooth' });
    },[allFetchedMessages])
    return (
        <div id="active-chat-container" className="d-flex flex-column justify-content-end h-100">
            <div id="active-chat-messages-container" className="d-flex flex-column my-4 h-100 p-4" ref={messagesContainer}>
                {allFetchedMessages && allFetchedMessages.map((message, index)=>
                    <ChatMessage key={index} message={message}/>
                )}
            </div>

            <form onSubmit={handleMessageSubmit} className="d-flex justify-content-center w-100 mb-3">
                <div id="chat-input-container" className="d-flex">
                    <InputEmoji value={message} onChange={setMessage} placeholder="" onEnter={handleMessageSubmit}/>
                    <div className="d-flex align-items-center cursor-pointer px-2" onClick={handleMessageSubmit}>
                        <SendRoundedIcon sx={{fontSize: 30, color: "#989898"}}/>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default ActiveChat;
