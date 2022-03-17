import {Helmet} from "react-helmet";
import "./chat/chat.css"
import ConversationList from "./chat/ConversationList";
import ChatWindow from "./chat/ChatWindow";
import MessageReceiverInfo from "./chat/MessageReceiverInfo";
import {useSelector} from "react-redux";

const Chat = () => {
    const isChatActive = useSelector(state => state.activeChatWindow.value).isActive;
    return (
        <div id="chat-main-container" className="mx-auto">
            <Helmet>
                <title>Wiadomości | BorrowMe</title>
            </Helmet>
            <ConversationList/>
            <ChatWindow/>
            {isChatActive &&
                <MessageReceiverInfo/>
            }
        </div>
    );
};

export default Chat;
