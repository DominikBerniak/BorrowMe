import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ImageAPI from "../../components/ImageAPI";
import {getData} from "../../services/apiFetch";
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

const AnnouncementPage = () => {
    const [date, setDate] = useState(new Date());
    const [imageDirectory, setPath] = useState("");
    const [imageName, setImageName] = useState("")
    const [count, setCount] = useState(0)
    const [announcementData, setData] = useState();
    const [quantity, setQuantity] = useState(1);
    const {announcementId} = useParams();
    const actionLink = `api/announcements/${announcementId}/Reservation`;
    const navigate = useNavigate();
    let handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/announcements/${announcementId}`)
    };
    let handleImageChange = () => {
        setPath(announcementData.pictureLocations[count].imageDirectory)
        setImageName(announcementData.pictureLocations[count].imageName)

    }
    let handleNextImage = () => {
        if (count < {announcementData}.images.length)
        {
            setCount(count => count + 1);
            console.log(count)
            handleImageChange()
        }
    };
    let handlePreviousImage = () => {
        if (count > 0)
        {
            setCount(count => count - 1);
            console.log(count)
            handleImageChange()
        }
    };

    useEffect(() => {
            getData(`/Announcements/${announcementId}`)
                .then(data => {
                    setData(data);
                    setPath(data.pictureLocations[0].directoryName);
                    setImageName(data.pictureLocations[0].fileName);
                });
    }, [])

    return (
        <div className="announcement-container">
            {announcementData ?
               <>
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
                                        <button type="button" onClick={handlePreviousImage}
                                                className="btn btn-outline-warning image-buttons">
                                            <ArrowPrevious/>
                                        </button>
                                    }
                                    <ImageAPI imageDirectory={imageDirectory} imageName={imageName} classNames="announcement-picture"/>
                                    {announcementData.pictureLocations.length > 1 &&
                                        <button type="button" onClick={handleNextImage}
                                                className="btn btn-outline-warning image-buttons">
                                            <ArrowNext/>
                                        </button>
                                    }
                                </>
                                : <NoImage/>
                            }
                        </div>
                            <div className="calendar-container center">
                                <Calendar onChange={setDate} value={date} nextLabel={<ArrowNext/>} prevLabel={<ArrowPrevious/>} next2Label={<CaretNext/>} prev2Label={<CaretPrevious/>} selectRange={true} returnValue="range"/>
                            </div>
                            <div className="choosing-date-form">
                                <form method="post" action={actionLink} id="reservation-form" onSubmit={handleSubmit}>
                                    <DateRangePicker value={date} disableCalendar={true} onChange={setDate} rangeDivider="-"/>
                                    <div className="reservation-price-container">
                                        <label id="reservation-price-paragraph">Cena rezerwacji:</label>
                                        <p id="reservation-price">{getCorrectPaymentElem(announcementData, quantity)}</p>
                                    </div>
                                    <div className="reservation-button-container center">
                                        <button type="submit" className="btn btn-warning"
                                                id="reservation-button">Zarezerwuj
                                        </button>
                                    </div>
                                </form>
                            </div>
                        <div className="city">
                            <p>Lokalizacja: {announcementData.city.name}, {announcementData.voivodeship.name}</p>
                            <p>mapka</p>
                        </div>
                    </div>
                    <div className="announcement-bottom">
                        <div className="owner">
                                <label>Autor: </label>
                                <Link id="link-to-user-page" to={"/Users/"+announcementData.owner.id}>{announcementData.owner.firstName} {announcementData.owner.lastName}</Link>
                        </div>
                        <div className="publish-date">
                            <p>Opublikowano {announcementData.publishDate.slice(0, 10)} o godzinie {announcementData.publishDate.slice(11, 16)}</p>
                        </div>
                    </div>
                </>:<Spinner/>
            }
        </div>
    )
}

export default AnnouncementPage