import "./reservationTile.css"
import {useNavigate} from "react-router-dom";
import XIcon from "../../components/XIcon";
import DoneIcon from "../../components/DoneIcon";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MessageIcon from "../../components/MessageIcon";

const ReservationTile = ({reservation, classNames, isAccepted = true, isExpired = false}) => {
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
            <button onClick={handleClick} type="button"
                    className="btn btn-sm title-button text-capitalize">{reservation.announcement.title}</button>
            <div className="reservation-dates">
                <label>Zarezerwowane od {startDay.toLocaleDateString()} do {endDay.toLocaleDateString()}</label>
            </div>
            </div>
            {!isAccepted &&
                <div className="accept-reservation-button">
                    <button type="button" className="btn btn-success btn-sm accept-button">Akceptuj <DoneIcon/></button>
                </div>}
            {isAccepted && !isExpired &&
                <div className="contact-owner-button">
                    <button type="button" className="btn btn-sm contact-button">Skontaktuj się <MessageIcon/></button>
                </div>
            }
            {isExpired &&
                <div className="rate-reservation-button">
                    <button type="button" className="btn btn-info btn-sm rate-button">Oceń <StarBorderIcon fontSize="small"/></button>
                </div>
            }
            <div className="delete-reservation-button">
                <button type="button" className="btn delete-button" onClick={deleteReservation}><XIcon/></button>
            </div>
        </div>
    )
}

export default ReservationTile