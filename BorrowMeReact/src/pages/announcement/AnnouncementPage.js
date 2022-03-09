import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ImageAPI from "../../components/ImageAPI";
import {getData, postData} from "../../services/apiFetch";
import "./announcementPage.css"
import Spinner from "../../components/Spinner";
import {useNavigate} from "react-router-dom";
import Calendar from 'react-calendar'
import '../../styles/Custom-calendar.css';
import '../../styles/Custom-DatePicker.css';
import CaretNext from "../../components/CaretNext";
import CaretPrevious from "../../components/CaretPrevious";
import ArrowPrevious from "../../components/ArrowPrevious";
import ArrowNext from "../../components/ArrowNext";
import {getCorrectPaymentElem, isWithinRanges} from "../../services/announcementUtils";
import NoImage from "../../components/NoImage";
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";

const AnnouncementPage = () => {
    const [date, setDate] = useState();
    const [imageDirectory, setPath] = useState("");
    const [imageName, setImageName] = useState("")
    const [count, setCount] = useState(0)
    const [announcementData, setAnnouncementData] = useState();
    const [reservations, setReservations] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const {announcementId} = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.value);

    let handleSubmit = () => {
        if (user.userId === "") {
            navigate("/login")
            return;
        }
        else if (date !== null)
        {
            console.log(new Date(date[0]));
            console.log(date[1].toString());
            let response = postData(`/api/Reservations`, {
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
        if (date !== null) {
            for(let i = 0; i < reservations.length; i++)
            {
                console.log(reservations[i][0])
                if (isWithinRanges(reservations[i][0], [date]) || isWithinRanges(reservations[i][1], [date]))
                {
                    isAvailableDate = false;
                }
            }
        }
        if (isAvailableDate) {
            setDate(date)
            if (date == null || date[0] === null || date[1] === null)
            {
                setQuantity(0);
            } else
            {
                let differenceInTime = date[1].getTime() - date[0].getTime();
                let differenceInDays = differenceInTime / (1000 * 3600 * 24);
                setQuantity(Math.round(differenceInDays))
            }
        } else {
            setDate(null)
            setQuantity(0);
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
                        for(let i = 0; i < data.reservations.length; i++)
                        {
                            reservations.push([new Date(data.reservations[i].reservationStartDay), new Date(data.reservations[i].reservationEndDay)])
                        }
                        return reservations
                    })
                    setPath(data.announcement.pictureLocations[count].directoryName);
                    setImageName(data.announcement.pictureLocations[count].fileName);
                });
    }, [count])

    return (
        <div className="announcement-container">
            {announcementData ?
               <>
                   <Helmet>
                       <title>{announcementData.title} | BorrowMe</title>
                   </Helmet>
                    <div className="bg-success announcement-top">
                        <h2 id="title">{announcementData.title}</h2>
                        <h2 id="price">{getCorrectPaymentElem(announcementData)}</h2>
                    </div>
                    <div className="announcement-middle">
                        <div className="announcement-description">
                            <p className={"description-text"}>{announcementData.description}</p>
                        </div>
                        <div className="announcement-picture-container center">
                            {imageDirectory !== "" ?
                                <>
                                    {announcementData.pictureLocations.length > 1 &&
                                        <button type="button" onClick={handlePreviousImage} className="btn btn-success image-buttons">
                                            <ArrowPrevious/>
                                        </button>
                                    }
                                    <ImageAPI imageDirectory={imageDirectory} imageName={imageName}
                                              classNames="announcement-picture"/>
                                    {announcementData.pictureLocations.length > 1 &&
                                        <button type="button" onClick={handleNextImage} className="btn btn-success image-buttons">
                                            <ArrowNext/>
                                        </button>
                                    }
                                </>
                                : <NoImage/>
                            }
                        </div>
                            <div className="calendar-container center">
                                <Calendar locale="pl-PL" onChange={onChange} value={date} nextLabel={<ArrowNext/>} prevLabel={<ArrowPrevious/>} next2Label={<CaretNext/>} prev2Label={<CaretPrevious/>} tileDisabled={tileDisabled} minDate={new Date()} selectRange={true} returnValue="range"/>
                            </div>
                            <div className="choosing-date-form">
                                <div id="reservation-form" >
                                    <DateRangePicker value={date} disableCalendar={true} onChange={onChange} rangeDivider="-"/>
                                    <div className="reservation-price-container">
                                        <label id="reservation-price-paragraph">Cena rezerwacji:</label>
                                        <p id="reservation-price">{quantity > 0 ? getCorrectPaymentElem(announcementData, quantity) : ""}</p>
                                    </div>
                                    <div className="reservation-button-container center">
                                        <button type="submit" className="btn btn-success" id="reservation-button" onClick={handleSubmit}>Zarezerwuj</button>
                                    </div>
                                </div>
                            </div>
                        <div className="city-announcement-container">
                            <label
                                id="localization-label">Lokalizacja: {announcementData.city.name}, {announcementData.voivodeship.name}</label>
                            <ImageAPI imageDirectory="site-images" imageName="krakow.png"
                                      classNames="announcement-picture"/>
                        </div>
                    </div>
                    <div className="announcement-bottom">
                        <div className="owner-announcement-container">
                            <label>Autor: </label>
                            <Link id="link-to-user-page"
                                  to={"/Users/" + announcementData.owner.id}>{announcementData.owner.firstName} {announcementData.owner.lastName}</Link>
                        </div>
                        <div className="publish-date">
                            <p>Opublikowano {announcementData.publishDate.toLocaleDateString()} o
                                godzinie {announcementData.publishDate.slice(11, 16)}</p>
                        </div>
                    </div>
                </>
                :
                <Spinner/>
            }
        </div>
    )
}

export default AnnouncementPage