import {useEffect, useState} from "react";

const ChatMessageTime = ({lastMessageTime, messageTime, updateLastMessageTime, message}) => {
    const [timeValue, setTimeValue] = useState(null)

    useEffect(()=>{
        // //|| lastMessageTime.date !== messageTime.date)
        // if (message.isFirst || (lastMessageTime && lastMessageTime.date !== messageTime.date))
        // {
        //     console.log("if")
        //     updateLastMessageTime(messageTime);
        //     setTimeValue(`${messageTime.date} ${messageTime.time}`);
        // }
        // else if(!message.isFirst && (lastMessageTime && lastMessageTime.time !== messageTime.time))
        // {
        //     console.log("else")
        //     updateLastMessageTime(messageTime);
        //     setTimeValue(messageTime.time);
        // }
        // // else {
        // //     setTimeValue(messageTime.time);
        // // }
        if (message.shownTime)
        {
            setTimeValue(message.shownTime);
        }
    },[])

    return (
        <>
            {message.shownTime &&
                <div className="d-flex align-items-center justify-content-center w-100 mx-auto mb-2 user-select-none">
                    <hr className="w-20"/>
                    <div className="mx-4">{timeValue}</div>
                    <hr className="w-20"/>
                </div>
            }
        </>
    );
};

export default ChatMessageTime;
