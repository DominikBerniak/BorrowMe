import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";
import "./chat/chat.css"
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7058/api/chat')
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on("ReceiveMessage", (message) => {
                        setAllMessages(prev => [...prev, message]);
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (connection) await connection.send("SendMessage", message);
        setMessage("");
    }
    return (
        <div>
            <Helmet>
                <title>Wiadomości | BorrowMe</title>
            </Helmet>
            <form className="d-flex flex-column align-items-center w-50 mx-auto" onSubmit={handleSubmit}>
                <input type="text" className="w-50" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit" className="btn bg-primary">Wyślij</button>
            </form>
            <div id="chat-messages" className="d-flex flex-column mx-auto mt-4 rounded p-5">
                {allMessages && allMessages.map((message, index)=>
                    <div key={index}>->{message}</div>
                )}
            </div>


        </div>
    );
};

export default Chat;
