import {useDispatch, useSelector} from "react-redux";
import {changeActiveChatWindow} from "../../../features/activeChatWindow";
import {clearActiveChatFetchedMessages} from "../../../features/activeChatFetchedMessages";

const ConversationsReservations = ({reservations}) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.authUser.value).userId;
    const reservationId = useSelector(state=>state.activeChatWindow.value).reservationId;

    const changeChatWindow = (reservation) => {
        dispatch(clearActiveChatFetchedMessages())
        dispatch(changeActiveChatWindow({
            isActive: true,
            senderId: userId,
            receiverId: reservation.announcementOwner.id,
            receiverPicture: reservation.announcementOwner.avatarName,
            receiverFullName: `${reservation.announcementOwner.firstName} ${reservation.announcementOwner.lastName}`,
            reservationId: reservation.reservationId,
            reservationDateStart: reservation.reservationDates.startDay,
            reservationDateEnd: reservation.reservationDates.endDay,
            announcementTitle: reservation.announcementTitle,
            isAnnouncementSenders: false
        }))
    }
    return (
        <div className="w-100">
            {reservations.map(reservation =>
                <div key={reservation.reservationId} className={"d-flex flex-column w-100 mx-auto cursor-pointer px-3 py-2 chat-conversation-button "
                    + (reservation.reservationId === reservationId && "selected-chat-conversation-button")
                    } onClick={() => changeChatWindow(reservation)}
                >
                    <div className="w-100 fw-bold">{reservation.announcementOwner.firstName} {reservation.announcementOwner.lastName}</div>
                    <div>ogłoszenie: {reservation.announcementTitle}</div>
                </div>
            )}
        </div>
    );
};

export default ConversationsReservations;
