import {useSelector} from "react-redux";
import ChatMessageTime from "./ChatMessageTime";

const ChatMessage = ({message, lastMessageTime, updateLastMessageTime}) => {
    const userData = useSelector(state=>state.user.value);

    return (
        <div className="my-2">
            <ChatMessageTime lastMessageTime={lastMessageTime} messageTime={message.sendTime} updateLastMessageTime={updateLastMessageTime} message={message}/>
            {message.sender.id === userData.userId ?
                //sent message
                <div className="d-flex justify-content-end">
                    <div className="bg-primary text-white d-inline-block py-2 px-3 chat-message">
                        {message.text}
                    </div>
                </div>
                :
                //received message
                <div className="d-flex justify-content-start">
                    <div className="bg-secondary text-white d-inline-block py-2 px-3 chat-message">
                        {message.text}
                    </div>
                </div>
            }
        </div>
    );
};

export default ChatMessage;
