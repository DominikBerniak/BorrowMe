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
import {getCorrectPaymentElem} from "../../services/announcementUtils";
import NoImage from "../../components/NoImage";
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import {Helmet} from "react-helmet";

const AnnouncementPage = () => {
    const [date, setDate] = useState(new Date());
    const [imageDirectory, setPath] = useState("");
    const [imageName, setImageName] = useState("")
    const [count, setCount] = useState(0)
    const [announcementData, setAnnouncementData] = useState();
    const [reservations, setReservations] = useState();
    const [quantity, setQuantity] = useState(0);
    const {announcementId} = useParams();
    const navigate = useNavigate();
    let handleSubmit = () => {
        let response = postData(`/api/Reservations`, {
            announcementId: announcementId,
            userId: "65BBBB86-B46A-4114-2A34-08D9F157CDA3", //zmienic na id użytkownika!!!!!!
            startDate: date[0],
            endDate: date[1]
        })
            .then(response => {
                navigate(`/reservation/${response.id}`)
            })

    };
    let handleNextImage = () => {
        if (count < announcementData.pictureLocations.length-1)
        {
            setCount(count + 1);
        }
        else {
            setCount(0)
        }
    };
    let handlePreviousImage = () => {
        if (count > 0)
        {
            setCount(count - 1);
        }
        else {
            setCount(announcementData.pictureLocations.length-1)
        }
    };
    let onChange = (date) => {
        setDate(date)
        if (date == null || date[0] === null || date[1] === null)
        {
            setQuantity(0);
        }
        else
        {
            let differenceInTime = date[1].getTime() - date[0].getTime();
            let differenceInDays = differenceInTime / (1000 * 3600 * 24);
            setQuantity(Math.round(differenceInDays))
        }
    }

    useEffect(() => {
            getData(`/api/Announcements/${announcementId}`)
                .then(data => {
                    setAnnouncementData(data.announcement);
                    setReservations(data.reservations)
                    setPath(data.announcement.pictureLocations[count].directoryName);
                    console.log(data.announcement.pictureLocations[count].directoryName)
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
                    <div className="btn-warning announcement-top">
                        <h2 id="title">{announcementData.title}</h2>
                        <h2 id="price">{getCorrectPaymentElem(announcementData)}</h2>
                    </div>
                    <div className="announcement-middle">
                        <div className="announcement-description">
                            <p className={"description-text"}>{announcementData.description}</p>
                        </div>
                        <div className="announcement-picture-container center">
                            {imageDirectory!=="" ?
                                <>
                                    {announcementData.pictureLocations.length > 1 &&
                                        <button type="button" onClick={handlePreviousImage} className="btn btn-warning image-buttons">
                                            <ArrowPrevious/>
                                        </button>
                                    }
                                    <ImageAPI imageDirectory={imageDirectory} imageName={imageName} classNames="announcement-picture"/>
                                    {announcementData.pictureLocations.length > 1 &&
                                        <button type="button" onClick={handleNextImage} className="btn btn-warning image-buttons">
                                            <ArrowNext/>
                                        </button>
                                    }
                                </>
                                : <NoImage/>
                            }
                        </div>
                            <div className="calendar-container center">
                                <Calendar onChange={onChange} value={date} nextLabel={<ArrowNext/>} prevLabel={<ArrowPrevious/>} next2Label={<CaretNext/>} prev2Label={<CaretPrevious/>} minDate={new Date()} selectRange={true} returnValue="range"/>
                            </div>
                            <div className="choosing-date-form">
                                <div id="reservation-form" >
                                    <DateRangePicker value={date} disableCalendar={true} onChange={onChange} rangeDivider="-"/>
                                    <div className="reservation-price-container">
                                        <label id="reservation-price-paragraph">Cena rezerwacji:</label>
                                        <p id="reservation-price">{quantity > 0 ? getCorrectPaymentElem(announcementData, quantity) : ""}</p>
                                    </div>
                                    <div className="reservation-button-container center">
                                        <button type="submit" className="btn btn-warning" id="reservation-button" onClick={handleSubmit}>Zarezerwuj</button>
                                    </div>
                                </div>
                            </div>
                        <div className="city-announcement-container">
                            <label id="localization-label">Lokalizacja: {announcementData.city.name}, {announcementData.voivodeship.name}</label>
                            <ImageAPI imageDirectory="site-images" imageName="krakow.png" classNames="announcement-picture"/>
                        </div>
                    </div>
                    <div className="announcement-bottom">
                        <div className="owner-announcement-container">
                                <label>Autor: </label>
                                <Link id="link-to-user-page" to={"/Users/"+announcementData.owner.id}>{announcementData.owner.firstName} {announcementData.owner.lastName}</Link>
                        </div>
                        <div className="publish-date">
                            <p>Opublikowano {announcementData.publishDate.slice(0, 10)} o godzinie {announcementData.publishDate.slice(11, 16)}</p>
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