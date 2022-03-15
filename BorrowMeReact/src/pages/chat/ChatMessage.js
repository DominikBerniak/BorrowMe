import {useSelector} from "react-redux";
import {useEffect} from "react";

const ChatMessage = ({message}) => {
    const userData = useSelector(state=>state.user.value);
    useEffect(()=>{
        console.log(userData.email)
    },[])
    return (
        <div className="my-2">
            <div className="d-flex align-items-center w-50 mx-auto mb-2 user-select-none">
                <hr className="w-50"/>
                <div className="mx-3">{message.time}</div>
                <hr className="w-50"/>
            </div>
            {message.from === userData.email ?
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
