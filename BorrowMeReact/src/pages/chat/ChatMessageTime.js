import {useEffect, useState} from "react";

const ChatMessageTime = ({message}) => {
    const [timeValue, setTimeValue] = useState(null)

    useEffect(()=>{
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
