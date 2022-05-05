import "./reservationTile.css"
import {useNavigate} from "react-router-dom";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import {deleteData, patchData} from "../../services/apiFetch";
import {useState} from "react";
import ConfirmModal from "../../components/ConfirmModal";

const ReservationTile = ({reservation, classNames, isAccepted = true, isExpired = false, isUserReservation = true, reservationAccept, setReservationAccept, reservationDelete, setReservationDelete}) => {
    const startDay = new Date(reservation.reservationStartDay);
    const endDay = new Date(reservation.reservationEndDay);
    const navigate = useNavigate();
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState("accept");
    let handleClick = () => {
        navigate(`/announcement/${reservation.announcement.id}`)
    }
    let deleteReservation = () => {
        let response = deleteData(`/api/Reservations/${reservation.id}`)
            .then(response => {
                console.log(response)
            })
        setReservationDelete(!reservationDelete)
        setModalVisible(false)
    }
    let acceptReservation = () => {
        let response = patchData(`/api/Reservations/${reservation.id}/accept`, true)
            .then(response => {
                console.log(response)
            })
        setReservationAccept(!reservationAccept);
        setModalVisible(false)
    }
    let unacceptReservation = () => {
        let response = patchData(`/api/Reservations/${reservation.id}/accept`, false)
            .then(response => {
                console.log(response)
            })
        setReservationAccept(!reservationAccept);
        setModalVisible(false)
    }
    let hideModal = () => {
        setModalVisible(false)
    }
    let handleDelete = () => {
        setModalType("delete");
        setModalVisible(true);
    }
    let handleAccept = () => {
        setModalType("accept")
        setModalVisible(true);

    }
    let handleUnaccept = () => {
        setModalType("unaccept")
        setModalVisible(true);
    }

    return (
        <div className={classNames}>
            <ConfirmModal type={modalType} showModal={isModalVisible} confirmModal={modalType === "delete" ? deleteReservation : (modalType === "accept" ? acceptReservation : unacceptReservation)} hideModal={hideModal}/>
            <label id="reservation-details-label">Szczegóły rezerwacji:</label>
            <div className="announcement-title-reservation-dates">
                    <span onClick={handleClick}
                          className="title-button text-capitalize center">{reservation.announcement.title}</span>
            <div className="reservation-dates">
                <label>Daty: {startDay.toLocaleDateString()} - {endDay.toLocaleDateString()}</label>
            </div>
            </div>
            <div className="reservation-tile-buttons">
                {!isAccepted && !isExpired && !isUserReservation &&
                    <button type="button" className="btn btn-success btn-sm accept-button" onClick={handleAccept}>Akceptuj <DoneOutlinedIcon fontSize="small"/></button>}
                {isAccepted && !isExpired && !isUserReservation &&
                    <button type="button" className="btn btn-sm unaccept-button" onClick={handleUnaccept}>Usuń akceptację</button>}
                {isAccepted && !isExpired && isUserReservation &&
                    <button type="button" className="btn btn-sm contact-button">Skontaktuj się <EmailOutlinedIcon fontSize="small"/></button>}
                {isExpired &&
                    <button type="button" className="btn btn-info btn-sm rate-button"><div className="me-1">Oceń</div>
                        <StarBorderOutlinedIcon fontSize="small"/>
                    </button>}
                <button type="button" className="btn delete-button" onClick={handleDelete}><ClearOutlinedIcon/></button>
            </div>
        </div>
    )
}

export default ReservationTile
