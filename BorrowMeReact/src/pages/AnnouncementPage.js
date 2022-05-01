import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ImageAPI from "../components/ImageAPI";
import {getData, postData} from "../services/apiFetch";
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

const AnnouncementPage = () => {
    const [date, setDate] = useState();
    const [imageDirectory, setPath] = useState("");
    const [imageName, setImageName] = useState("")
    const [count, setCount] = useState(0)
    const [announcementData, setAnnouncementData] = useState();
    const [reservations, setReservations] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);
    const {announcementId} = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.value);

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
    useEffect(() => {
        getData(`/api/Announcements/${announcementId}`)
            .then(data => {
                setAnnouncementData(data.announcement);
                setReservations(() => {
                    let reservations = [];
                    for (let i = 0; i < data.reservations.length; i++) {
                        reservations.push([new Date(data.reservations[i].reservationStartDay), new Date(data.reservations[i].reservationEndDay)])
                    }
                    return reservations
                })
                setPath(data.announcement.pictureLocations[count].directoryName);
                setImageName(data.announcement.pictureLocations[count].fileName);
            });
    }, [count])

    const showGallery = () => {
        setIsGalleryVisible(true);
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);
    }
    const hideGallery = () => {
        setIsGalleryVisible(false);
        document.body.style.overflow = "auto";
    }

    return (
        <div className="announcement-container">
            {announcementData ?
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
                        <div className="calendar-container center">
                            <Calendar locale="pl-PL" onChange={onChange} value={date} nextLabel={<ArrowForwardIcon/>}
                                      prevLabel={<ArrowBackIcon/>} next2Label={<ArrowForwardIosIcon/>}
                                      prev2Label={<ArrowBackIosNewIcon/>} tileDisabled={tileDisabled} minDate={new Date()}
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
                                    <h5 className="">Wybierz termin rezerwacji</h5>
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
                            <label className="mb-3">Lokalizacja: {announcementData.city.name}, {announcementData.voivodeship.name}</label>
                            <iframe width="420" height="500" id="gmap_canvas" loading="lazy"
                                    src={`https://maps.google.com/maps?q=${announcementData.city.name}&z=14&output=embed`}>
                            </iframe>
                        </div>
                    </div>
                    <div className="announcement-bottom">
                        <div className="owner-announcement-container">
                            <label>Autor: </label>
                            <Link id="link-to-user-page"
                                  to={`/Users/${announcementData.owner.id}`}>{announcementData.owner.firstName} {announcementData.owner.lastName}</Link>
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
        </div>
    )
}

export default AnnouncementPage
