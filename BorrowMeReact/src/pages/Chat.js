import {Helmet} from "react-helmet";
import "./chat/chat.css"
import ConversationList from "./chat/ConversationList";
import ChatWindow from "./chat/ChatWindow";
import MessageReceiverInfo from "./chat/MessageReceiverInfo";

const Chat = () => {
    return (
        <div id="chat-main-container" className="mx-auto">
            <Helmet>
                <title>Wiadomości | BorrowMe</title>
            </Helmet>
            <ConversationList/>
            <ChatWindow/>
            <MessageReceiverInfo/>
        </div>
    );
};

export default Chat;
