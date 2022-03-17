import {useDispatch, useSelector} from "react-redux";
import {changeActiveChatWindow} from "../../../features/activeChatWindow";
import {clearActiveChatFetchedMessages} from "../../../features/activeChatFetchedMessages";

const ConversationsAnnouncements = ({announcements}) => {
    const dispatch = useDispatch();
    const userId = useSelector(state=>state.authUser.value).userId;
    const reservationId = useSelector(state=>state.activeChatWindow.value).reservationId;

    const changeChatWindow = (reservation, announcement) => {
        dispatch(clearActiveChatFetchedMessages())
        dispatch(changeActiveChatWindow({
            isActive: true,
            senderId: userId,
            receiverId: reservation.owner.id,
            receiverPicture: reservation.owner.avatarName,
            receiverFullName: `${reservation.owner.firstName} ${reservation.owner.lastName}`,
            reservationId: reservation.reservationId,
            reservationDateStart: reservation.reservationDates.startDay,
            reservationDateEnd: reservation.reservationDates.endDay,
            announcementTitle: announcement.announcementTitle,
            isAnnouncementSenders: true
        }))
    }
    return (
        <div className="w-100">
            {announcements.map(announcement=>
                {
                    return announcement.reservations.map(reservation=>
                    <div key={reservation.reservationId} className={"d-flex flex-column w-100 mx-auto cursor-pointer px-3 py-2 chat-conversation-button "
                        + (reservation.reservationId === reservationId && "selected-chat-conversation-button")
                    }
                        onClick={()=>changeChatWindow(reservation, announcement)}
                    >
                        <div className="w-100 fw-bold">{reservation.owner.firstName} {reservation.owner.lastName}</div>
                        <div>ogłoszenie: {announcement.announcementTitle}</div>
                    </div>
                )}
            )}
        </div>
    );
};

export default ConversationsAnnouncements;
