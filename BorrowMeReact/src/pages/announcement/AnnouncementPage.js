import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ImageAPI from "../../components/ImageAPI";
import {getData} from "../../services/apiFetch";
import "./announcementPage.css"
import Spinner from "../../components/Spinner";
import {useNavigate} from "react-router-dom";
import img from "../..//images/losiek.jpg";
import Calendar from 'react-calendar'
import '../../styles/Custom-calendar.css';
import CaretNext from "../../components/CaretNext";
import CaretPrevious from "../../components/CaretPrevious";
import ArrowPrevious from "../../components/ArrowPrevious";
import ArrowNext from "../../components/ArrowNext";

const AnnouncementPage = () => {
    const [date, setDate] = useState(new Date());
    const [imageDirectory, setPath] = useState("");
    const [imageName, setImageName] = useState("")
    const [count, setCount] = useState(0)
    const [announcementData, setData] = useState();
    const actionLink = `api/announcements/3/Reservation`; //${announcementId}
    const navigate = useNavigate();
    const {announcementId} = useParams();
    let handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/announcements/3`) //${announcementId}
    };
    let handleImageChange = () => {
        setPath(`${announcementData}.images[${count}].imagePath`)
        setImageName(`${announcementData}.images[${count}].imageName`)
    }
    let handleNextImage = () => {
        setCount(count + 1);
        handleImageChange()
    };
    let handlePreviousImage = () => {
        setCount(count - 1);
        handleImageChange()
    };

    useEffect(() => {
            getData(`/Announcements/${announcementId}`)
                .then(data => {setData(data);})
            // imageDirectory = `${announcementData}.images[${count}].imagePath`;
            // imageName = `${announcementData}.images[${count}].imageName`;
    }, [])

    return (
        <div className="announcement-container">
            {console.log(announcementData)}
            {announcementData ?
               <>
                    <div className="btn-warning announcement-top">
                        <h2 id="title">{announcementData.title}</h2>
                        <h2 id="price">10 zł / dzień</h2>
                    </div>
                    <div className="announcement-middle">
                        <div className="announcement-description">
                            <p className={"description-text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum metus ultricies nibh gravida posuere. Donec in mi nulla. Nam consectetur mauris vel sodales maximus. Sed at lorem porta, commodo elit nec, volutpat ex. Vestibulum maximus mollis erat, eget dignissim augue varius et. Quisque pharetra molestie cursus. Mauris dapibus nibh sed dolor consequat tempor.</p> {/*announcementData.description*/}
                        </div>
                        <div className="announcement-picture-container center">
                            <button type="button" onClick={handlePreviousImage} className="btn btn-outline-warning image-buttons">
                                <ArrowPrevious/>
                            </button>
                            <ImageAPI imageDirectory={announcementData.pictureLocations[0].directoryName} imageName={announcementData.pictureLocations[0].fileName} classNames="announcement-picture"/>
                            <button type="button" onClick={handleNextImage} className="btn btn-outline-warning image-buttons">
                                <ArrowNext/>
                            </button>
                        </div>
                        <div className="city">
                            <p>Lokalizacja: {announcementData.city.name}, {announcementData.voivodeship.name}</p>
                        </div>
                            <div className="calendar-container center">
                                <Calendar onChange={setDate} value={date} nextLabel={<ArrowNext/>} prevLabel={<ArrowPrevious/>} next2Label={<CaretNext/>} prev2Label={<CaretPrevious/>} selectRange={true}/>
                            </div>
                            <div className="choosing-date-form center">
                                <form method="post" action={actionLink} id="reservation-form" onSubmit={handleSubmit}>
                                    <div className="from-container">
                                        <label>Od </label>
                                        <input/>
                                    </div>
                                    <div className="to-container">
                                        <label>Do </label>
                                        <input/>
                                    </div>
                                    <div id="button-container" className="center">
                                        <button type="submit" className="btn btn-warning" id="reservation-button">Zarezerwuj</button>
                                    </div>
                                </form>
                    </div>
                    </div>
                    <div className="announcement-bottom">
                        <div className="id">
                        ID: {announcementData.id}
                        </div>
                        <div className="publish-date">
                            <p>Opublikowano {announcementData.publishDate.slice(0, 10)} o godzinie 17:12</p>
                        </div>
                        <div className="owner">
                            <p>Autor: {announcementData.owner.firstName} {announcementData.owner.lastName}</p>
                        </div>
                    </div>
                </>:<Spinner/>
            }
        </div>
    )
}

export default AnnouncementPage