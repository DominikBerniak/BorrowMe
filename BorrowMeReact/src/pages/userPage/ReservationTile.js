import "./reservationTile.css"
import {useNavigate} from "react-router-dom";
import XIcon from "../../components/XIcon";
import DoneIcon from "../../components/DoneIcon";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MessageIcon from "../../components/MessageIcon";
import StarIcon from "../../components/StarIcon";

const ReservationTile = ({reservation, classNames, isAccepted = true, isExpired = false, isUserReservation = true}) => {
    const startDay = new Date(reservation.reservationStartDay);
    const endDay = new Date(reservation.reservationEndDay);
    const navigate = useNavigate();
    let handleClick = () => {
        navigate(`/announcement/${reservation.announcement.id}`)
    }
    let deleteReservation = () => {
    }

    return (
        <div className={classNames}>
            <label id="reservation-details-label">Szczegóły rezerwacji:</label>
            <div className="announcement-title-reservation-dates">
                    <span onClick={handleClick}
                          className="title-button text-capitalize center">{reservation.announcement.title}</span>
            <div className="reservation-dates">
                <label>Daty: {startDay.toLocaleDateString()} - {endDay.toLocaleDateString()}</label>
            </div>
            </div>
            <div className="delete-reservation-button">
                {!isAccepted && !isExpired && !isUserReservation &&
                    <button type="button" className="btn btn-success btn-sm accept-button">Akceptuj <DoneIcon/></button>}
                {isAccepted && !isExpired && isUserReservation &&
                    <button type="button" className="btn btn-sm contact-button">Skontaktuj się <MessageIcon/></button>}
                {isExpired &&
                    <button type="button" className="btn btn-info btn-sm rate-button"><div className="me-1">Oceń</div> <StarIcon/></button>}
                <button type="button" className="btn delete-button" onClick={deleteReservation}><XIcon/></button>
            </div>
        </div>
    )
}

export default ReservationTile