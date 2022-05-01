import "./reservationTile.css"
import {useNavigate} from "react-router-dom";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import {patchData} from "../../services/apiFetch";

const ReservationTile = ({reservation, classNames, isAccepted = true, isExpired = false, isUserReservation = true, state, setDummyState}) => {
    const startDay = new Date(reservation.reservationStartDay);
    const endDay = new Date(reservation.reservationEndDay);
    const navigate = useNavigate();
    let handleClick = () => {
        navigate(`/announcement/${reservation.announcement.id}`)
    }
    let handleDeleteReservation = () => {
    }
    let handleAccept = () => {
        let response = patchData(`/api/Reservations/${reservation.id}/accept`, true)
            .then(response => {
            })
        setDummyState(!state)
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
                    <button type="button" className="btn btn-success btn-sm accept-button" onClick={handleAccept}>Akceptuj <DoneOutlinedIcon/></button>}
                {isAccepted && !isExpired && isUserReservation &&
                    <button type="button" className="btn btn-sm contact-button">Skontaktuj się <EmailOutlinedIcon/></button>}
                {isExpired &&
                    <button type="button" className="btn btn-info btn-sm rate-button"><div className="me-1">Oceń</div>
                        <StarBorderOutlinedIcon/>
                    </button>}
                <button type="button" className="btn delete-button" onClick={handleDeleteReservation}><ClearOutlinedIcon/></button>
            </div>
        </div>
    )
}

export default ReservationTile
