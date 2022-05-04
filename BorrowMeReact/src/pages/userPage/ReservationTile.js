import "./reservationTile.css"
import {useNavigate} from "react-router-dom";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import {deleteData, patchData} from "../../services/apiFetch";
import {useEffect, useState} from "react";
import ConfirmModal from "../../components/ConfirmModal";
import {Button, Modal} from "react-bootstrap";

const ReservationTile = ({reservation, classNames, isAccepted = true, isExpired = false, isUserReservation = true, reservationAccept, setReservationAccept, reservationDelete, setReservationDelete}) => {
    const startDay = new Date(reservation.reservationStartDay);
    const endDay = new Date(reservation.reservationEndDay);
    const navigate = useNavigate();
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState("accept");
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    let handleClick = () => {
        navigate(`/announcement/${reservation.announcement.id}`)
    }
    let setMessageType = () => {
        if (modalType === "delete")
        {
            return "Czy na pewno chcesz usunąć te rezerwację?";
        } else if (modalType === "accept")
        {
            return "Czy na pewno chcesz zaakceptować te rezerwację?";
        } else if (modalType === "unaccept") {
            return "Czy na pewno chcesz usunąć akceptację tej rezerwacji?";
        }
    }
    let setTitleType = () => {
        if (modalType === "delete")
        {
            return "Usuwanie rezerwacji";
        } else if (modalType === "accept")
        {
            return "Akceptowanie rezerwacji";
        } else if (modalType === "unaccept") {
            return "Usuwanie akceptacji rezerwacji";
        }
    }
    let deleteReservation = () => {
        let response = deleteData(`/api/Reservations/${reservation.id}`)
            .then(response => {
            })
        setReservationDelete(!reservationDelete)
        setModalVisible(false)
    }
    let acceptReservation = () => {
        let response = patchData(`/api/Reservations/${reservation.id}/accept`, true)
            .then(response => {
            })
        setReservationAccept(!reservationAccept);
        setModalVisible(false)
    }
    let unacceptReservation = () => {
        let response = patchData(`/api/Reservations/${reservation.id}/accept`, false)
            .then(response => {
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
    useEffect(() => {
        setTitle(setTitleType())
        setMessage(setMessageType())
    }, [modalType])

    return (
        <div className={classNames}>
            {/*<ConfirmModal type={modalType} showModal={false} confirmModal={modalType === "delete" ? deleteReservation : (modalType === "accept" ? acceptReservation : unacceptReservation)} hideModal={hideModal}/>*/}
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
            <Modal show={isModalVisible} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body><div className={modalType === "delete" ? "alert alert-danger" : (modalType === "accept" ? "alert alert-success" : "alert alert-secondary")}>{message}</div></Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={hideModal}>
                        Nie
                    </Button>
                    <Button variant={modalType === "delete" ? "danger" : (modalType === "accept" ? "success" : "secondary")} onClick={modalType === "delete" ? deleteReservation : (modalType === "accept" ? acceptReservation : unacceptReservation)}>
                        Tak
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ReservationTile
