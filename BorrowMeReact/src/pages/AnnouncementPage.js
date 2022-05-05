import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ImageAPI from "../components/ImageAPI";
import {deleteData, getData, postData} from "../services/apiFetch";
import "./announcementPage/announcementPage.css"
import Spinner from "../components/Spinner";
import {useNavigate} from "react-router-dom";
import Calendar from 'react-calendar'
import '../styles/Custom-calendar.css';
import '../styles/Custom-DatePicker.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getCorrectPaymentElem, isWithinRanges} from "../services/announcementUtils";
import NoImage from "../components/NoImage";
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
import AnnouncementPictureGallery from "./announcementPage/AnnouncementPictureGallery";
import Avatar from "@mui/material/Avatar";
import ConfirmModal from "../components/ConfirmModal";

const AnnouncementPage = () => {
    const [date, setDate] = useState();
    const [imageDirectory, setPath] = useState("");
    const [imageName, setImageName] = useState("")
    const [count, setCount] = useState(0)
    const [announcementData, setAnnouncementData] = useState();
    const [announcementReservationsData, setAnnouncementReservationsData] = useState();
    const [paginatedReservations, setPaginatedReservations] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const {announcementId} = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.value);
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);
    const [isOwnAnnouncement, setIsOwnAnnouncement] = useState(false);
    const [reservationPageNumber, setReservationPageNumber] = useState(1);
    const [numberOfReservationPages, setNumberOfReservationPages] = useState(1);
    const [isModalVisible, setModalVisible] = useState(false);

    const userId = useSelector(state => state.user.value).userId;

    let handleSubmit = () => {
        if (user.userId === "") {
            navigate("/login")
        } else if (date !== null) {
            postData(`/api/Reservations`, {
                announcementId: announcementId,
                userId: user.userId,
                startDate: date[0],
                endDate: date[1]
            })
                .then(response => {
                    navigate(`/reservation/${response.id}`)
                })
        }
    };
    let handleNextImage = () => {
        if (count < announcementData.pictureLocations.length - 1) {
            setCount(count + 1);
        } else {
            setCount(0)
        }
    };
    let handlePreviousImage = () => {
        if (count > 0) {
            setCount(count - 1);
        } else {
            setCount(announcementData.pictureLocations.length - 1)
        }
    };
    let onChange = (date) => {
        let isAvailableDate = true;
        if (date !== null && date[0] !== undefined && date[1] !== undefined && date[0] < date[1]) {
            for (let i = 0; i < reservations.length; i++) {
                if (isWithinRanges(reservations[i][0], [date]) || isWithinRanges(reservations[i][1], [date])) {
                    isAvailableDate = false;
                    setQuantity(0);
                    setDate(null)
                }
            }
        }
        if (isAvailableDate) {
            setDate(date)
            if (date == null || date[0] === undefined || date[1] === undefined) {
                setQuantity(0);
            } else if (date[0] >= new Date().setTime(date[0].getTime())) {
                let differenceInTime = date[1].getTime() - date[0].getTime();
                let differenceInDays = differenceInTime / (1000 * 3600 * 24);
                setQuantity(Math.round(differenceInDays))
            }
        }
    }
    let tileDisabled = ({date, view}) => {
        if (view === 'month') {
            return isWithinRanges(date, reservations);
        }
    }
    let hideModal = () => {
        setModalVisible(false);
    }
    let handleDeleteAnnouncementButton = () => {
        setModalVisible(true);
    }
    let deleteAnnouncement = () => {
        let response = deleteData(`/api/Announcements/${announcementId}`)
            .then(response => {
                navigate(`/`);
            })
    }

    useEffect(() => {
        getData(`/api/Announcements/${announcementId}`)
            .then(data => {
                setAnnouncementData(data.announcement);
                let activeReservations = setActiveReservations(data.reservations);
                paginateReservations(activeReservations);
                checkIfOwnAnnouncement(data.announcement)
                setReservations(() => {
                    let reservations = [];
                    for (let i = 0; i < data.reservations.length; i++) {
                        reservations.push([new Date(data.reservations[i].reservationStartDay), new Date(data.reservations[i].reservationEndDay)])
                    }
                    return reservations
                })
                if (data.announcement.pictureLocations.length > 0) {
                    setPath(data.announcement.pictureLocations[count].directoryName);
                    setImageName(data.announcement.pictureLocations[count].fileName);
                }
            });
    }, [count])

    useEffect(()=>{
        if (!isOwnAnnouncement && announcementData)
        {
            checkIfOwnAnnouncement(announcementData);
        }
    },[userId])

    const checkIfOwnAnnouncement = (announcement) => {
        if (announcement.owner.id === userId) {
            setIsOwnAnnouncement(true);
        }
    }

    const showGallery = () => {
        setIsGalleryVisible(true);
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
    }
    const hideGallery = () => {
        setIsGalleryVisible(false);
        document.body.style.overflow = "auto";
    }

    const getCorrectPayment = (endDate, startDate) => {
        let endDateTime = new Date(endDate).getTime();
        let startDateTime = new Date(startDate).getTime();
        let numberOfDays = Math.ceil((endDateTime - startDateTime) / (1000 * 3600 * 24));
        return `${numberOfDays * announcementData.price} zł`
    }

    const setActiveReservations = (reservations) => {
        reservations = reservations
            .sort((a, b) => (new Date(a.reservationEndDay) > new Date(b.reservationEndDay) ? 1 : ((new Date(b.reservationEndDay) > new Date(a.reservationEndDay)) ? -1 : 0)))
            .filter(res => new Date(res.reservationEndDay) > new Date());
        setAnnouncementReservationsData(reservations);
        return reservations;
    }

    const paginateReservations = (reservations) => {
        const numberOfReservationsPerPage = 4;
        const pageSize = Math.ceil(reservations.length / numberOfReservationsPerPage);
        let paginatedReservations = Array.from({length: pageSize}, (_, index) => {
            const start = index * numberOfReservationsPerPage;
            return reservations.slice(start, start + numberOfReservationsPerPage);
        });
        setNumberOfReservationPages(pageSize);
        setPaginatedReservations(paginatedReservations);
    }

    const incrementReservationsPageNumber = () => {
        console.log(numberOfReservationPages)
        if (isOnLastReservationPage()) {
            console.log("nope")
            return;
        }
        setReservationPageNumber(prevState => prevState + 1);
    }
    const isOnLastReservationPage = () => {
        return reservationPageNumber === numberOfReservationPages;
    }

    const decrementReservationsPageNumber = () => {
        if (isOnFirstReservationPage()) {
            console.log("nope")
            return;
        }
        setReservationPageNumber(prevState => prevState - 1);
    }

    const isOnFirstReservationPage = () => {
        return reservationPageNumber === 1;
    }

    return (
        <div className="announcement-container">
            {(announcementData && announcementReservationsData) ?
                <>
                    <Helmet>
                        <title>{announcementData.title} | BorrowMe</title>
                    </Helmet>
                    <div className="announcement-top">
                        <h2 id="title">{announcementData.title}</h2>
                        <h2 id="price">{getCorrectPaymentElem(announcementData)}</h2>
                    </div>
                    <div className="announcement-middle">
                        <div className="announcement-description p-4">
                            <p className="description-text">{announcementData.description}</p>
                        </div>
                        <div className="announcement-picture-container">
                            {imageDirectory !== "" ?
                                <>
                                    {announcementData.pictureLocations.length > 1 &&
                                        <button type="button" onClick={handlePreviousImage}
                                                className="image-buttons image-buttons-previous">
                                            <ArrowBackIcon/>
                                        </button>
                                    }
                                    <div onClick={showGallery} className="mx-auto">
                                        <ImageAPI imageDirectory={imageDirectory} imageName={imageName}
                                                  classNames="announcement-picture"/>
                                    </div>
                                    {announcementData.pictureLocations.length > 1 &&
                                        <button type="button" onClick={handleNextImage}
                                                className="image-buttons image-buttons-next">
                                            <ArrowForwardIcon/>
                                        </button>
                                    }
                                </>
                                : <NoImage/>
                            }
                        </div>
                        {!isOwnAnnouncement ?
                            <>
                                <div className="calendar-container center">
                                    <Calendar locale="pl-PL" onChange={onChange} value={date}
                                              nextLabel={<ArrowForwardIcon/>}
                                              prevLabel={<ArrowBackIcon/>} next2Label={<ArrowForwardIosIcon/>}
                                              prev2Label={<ArrowBackIosNewIcon/>} tileDisabled={tileDisabled}
                                              minDate={new Date()}
                                              selectRange={true} returnValue="range"/>
                                </div>
                                <div className="choosing-date-form mx-auto">
                                    <div id="reservation-form">
                                        {quantity > 0 ?
                                            <div>
                                                <DateRangePicker value={date} disableCalendar={true} onChange={onChange}
                                                                 rangeDivider="-"/>
                                                <div className="reservation-price-container">
                                                    <label id="reservation-price-paragraph">{"Cena rezerwacji:"}</label>
                                                    <p id="reservation-price">{getCorrectPaymentElem(announcementData, quantity)}</p>
                                                </div>
                                            </div>
                                            :
                                            <h5>Wybierz termin rezerwacji</h5>
                                        }
                                        {quantity > 0 &&
                                            <div className="reservation-button-container center">
                                                <button type="submit" className="px-3 py-2" id="reservation-button"
                                                        onClick={handleSubmit}>Zarezerwuj
                                                </button>
                                            </div>}
                                    </div>
                                </div>
                                <div className="city-announcement-container p-3">
                                    <label
                                        className="mb-3">Lokalizacja: {announcementData.city.name}, {announcementData.voivodeship.name}</label>
                                    <iframe id="announcement-page-map" loading="lazy"
                                            src={`https://maps.google.com/maps?q=${announcementData.city.name}&z=14&output=embed`}>
                                    </iframe>
                                </div>
                            </>
                            :
                            <>
                                <div className={"announcement-reservations-table-container user-select-none "
                                    + (announcementReservationsData.length === 0 && "d-flex flex-column justify-content-center")}>
                                    {announcementReservationsData.length > 0 ?
                                        <>
                                            <div className="d-flex align-items-center justify-content-around">
                                                <button className="btn shadow-none" disabled={isOnFirstReservationPage()}
                                                        onClick={decrementReservationsPageNumber}>
                                                    <ArrowBackIosNewIcon/>
                                                </button>
                                                <h5 className="text-center my-4">Aktualne rezerwacje</h5>
                                                <button className="btn shadow-none" disabled={isOnLastReservationPage()}
                                                        onClick={incrementReservationsPageNumber}>
                                                    <ArrowForwardIosIcon/>
                                                </button>

                                            </div>
                                            <table
                                                className="announcement-reservations-table table table-hover text-center">
                                                <thead>
                                                <tr>
                                                    <th>Rezerwacja od:</th>
                                                    <th>Rezerwacja do:</th>
                                                    {announcementData.paymentType === 1 &&
                                                        <th>Koszt rezerwacji</th>
                                                    }
                                                    <th>Użytkownik</th>
                                                    <th>Status</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {paginatedReservations[reservationPageNumber - 1].map(reservation =>
                                                    <tr key={reservation.id}>
                                                        <td>{new Date(reservation.reservationStartDay).toLocaleDateString()}</td>
                                                        <td>{new Date(reservation.reservationEndDay).toLocaleDateString()}</td>
                                                        {announcementData.paymentType === 1 &&
                                                            <td>{getCorrectPayment(reservation.reservationEndDay, reservation.reservationStartDay)}</td>
                                                        }
                                                        <td>
                                                            <Link className="text-decoration-none"
                                                                  to={`/Users/${reservation.user.id}`}>{reservation.user.firstName} {reservation.user.lastName}</Link>
                                                        </td>
                                                        <td>{reservation.isAccepted ? "Zaakceptowana" : "Niezaakceptowana"}</td>
                                                    </tr>
                                                )

                                                }
                                                </tbody>
                                            </table>
                                        </>
                                        :
                                        <h5 className="text-center">Nie masz jeszcze żadnych rezerwacji</h5>
                                    }
                                </div>
                                <div className="announcement-options">
                                    <h5 className="text-center mt-4">Opcje Twojego ogłoszenia</h5>
                                    <div className="d-flex flex-column h-70 justify-content-center align-items-center">
                                        <Link to={`/announcement/${announcementData.id}/edit`} className="announcement-options-buttons">Edytuj ogłoszenie</Link>
                                        <button className="announcement-options-buttons" onClick={handleDeleteAnnouncementButton}>Usuń ogłoszenie</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div className="announcement-bottom">
                        <div className="owner-announcement-container">
                            {!isOwnAnnouncement &&
                                <>
                                    <label>Autor: </label>
                                    <Link id="link-to-user-page"
                                          to={`/Users/${announcementData.owner.id}`}>{announcementData.owner.firstName} {announcementData.owner.lastName}</Link>
                                </>
                            }
                        </div>
                        <div className="publish-date">
                            <p>Opublikowano {new Date(announcementData.publishDate).toLocaleDateString()} o
                                godzinie {announcementData.publishDate.slice(11, 16)}</p>
                        </div>
                    </div>
                </>
                :
                <Spinner/>
            }
            {isGalleryVisible &&
                <AnnouncementPictureGallery hideGallery={hideGallery} title={announcementData.title}
                                            pictureLocations={announcementData.pictureLocations}/>
            }
            <ConfirmModal showModal={isModalVisible} hideModal={hideModal} confirmModal={deleteAnnouncement} type="delete announcement"/>
        </div>
    );
}

export default AnnouncementPage
