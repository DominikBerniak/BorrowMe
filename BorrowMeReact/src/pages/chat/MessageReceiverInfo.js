import {useSelector} from "react-redux";
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom";
import Calendar from "react-calendar";
import {MonthView} from "react-calendar";
import {useEffect, useState} from "react";

const MessageReceiverInfo = () => {
    const chatData = useSelector(state => state.activeChatWindow.value);
    const [calendarValues, setCalendarValues] = useState(null)

    useEffect(()=>{
        let startDate = getDateFromDatetime(chatData.reservationDateStart)
        let endDate = getDateFromDatetime(chatData.reservationDateEnd);
        setCalendarValues([new Date(startDate), new Date(endDate)])
    },[chatData])

    const getDateFromDatetime = (datetime) => {
        let dateParts = datetime.split("T")[0];
        return dateParts
    }
    return (
        <div id="message-receiver-info-outer-container">
            <div id="message-receiver-info-inner-container"
                 className="d-flex flex-column align-items-center w-100 mx-auto user-select-none">
                <div className="mt-5">
                    {chatData.receiverPicture !== "" ?
                        <Avatar sx={{width: 120, height: 120}}
                                src={`/api/StaticFiles/user-images/${chatData.receiverId}/avatar/${chatData.receiverPicture}`}
                                draggable={"false"}
                        />
                        :
                        <Avatar sx={{width: 120, height: 120}}/>
                    }
                </div>
                <Link to={`/Users/${chatData.receiverId}`} className="h4 mt-3 text-decoration-none chat-link">{chatData.receiverFullName}</Link>
                <div className="d-flex w-60">
                    <hr className="w-100"/>
                </div>
                <h5 className="mb-5">{chatData.announcementTitle}</h5>
                <Calendar value={calendarValues} />
            </div>
        </div>
    );
};

export default MessageReceiverInfo;
