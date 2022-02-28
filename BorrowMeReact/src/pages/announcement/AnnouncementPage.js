import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ImageAPI from "../../components/ImageAPI";
import {getData} from "../../services/apiFetch";
import "./announcementPage.css"
import Spinner from "../../components/Spinner";
import {useNavigate} from "react-router-dom";
import img from "../../images/losiek.jpg";
import img2 from "../../images/zubr.jpg";
import img3 from "../../images/bobr.jpg";
import Calendar from 'react-calendar'
import '../../styles/Custom-calendar.css';
import CaretNext from "../../components/CaretNext";
import CaretPrevious from "../../components/CaretPrevious";
import ArrowPrevious from "../../components/ArrowPrevious";
import ArrowNext from "../../components/ArrowNext";

const AnnouncementPage = () => {
    const [date, setDate] = useState(new Date())
    //
    const [imageDirectory, setPath] = useState("");
    const [imageName, setImageName] = useState("")
    //
    const [count, setCount] = useState(0)
    const [announcementData, setData] = useState();
    // test
    const imagePaths = [
        img, img2, img3
    ]
    const [image, setImage] = useState(imagePaths[0]);
    //
    const actionLink = `api/announcements/3/Reservation`; //${announcementId}
    const navigate = useNavigate();
    const {announcementId} = useParams();
    let handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/announcements/3`) //${announcementId}
    };
    let handleImageChange = () => {
        setPath(`${announcementData}.images[${count}].${imageDirectory}`)
        setImageName(`${announcementData}.images[${count}].${imageName}`)
    }
    let handleNextImage = () => {
        if (count < imagePaths.length)
        {
            setCount(count => count + 1);
            console.log(count)
            setImage(imagePaths[count])
            //handleImageChange()
        }
    };
    let handlePreviousImage = () => {
        if (count > 0)
        {
            setCount(count => count - 1);
            console.log(count)
            setImage(imagePaths[count])
            //handleImageChange()
        }
    };
    const months = [
        "styczeń",
        "luty",
        "marzec",
        "kwiecień",
        "maj",
        "czerwiec",
        "lipiec",
        "sierpień",
        "wrzesień",
        "październik",
        "listopad",
        "grudzień"
    ]
    const dayOfWeek = [
        "nie",
        "pon",
        "wto",
        "śro",
        "czw",
        "pią",
        "sob"
    ]


    // useEffect(() => {
    //         getData(`/api/Announcements/${announcementId}`)
    //             .then(data => {setData(data);})
    //         imageDirectory = `${announcementData}.images[${count}].imagePath`;
    //         imageName = `${announcementData}.images[${count}].imageName`;
    // }, [])

    return (
        <div className="announcement-container">
            {/*{announcementData ?*/}
            {/*    <>*/}
                    <div className="btn-warning announcement-top">
                        <h2 id="title">Kosiarka spalinowa</h2> {/*announcementData.title*/}
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
                            <img className="picture" src={image}/>
                            <button type="button" onClick={handleNextImage} className="btn btn-outline-warning image-buttons">
                                <ArrowNext/>
                            </button>
                            {/*<ImageAPI imageDirectory="" imageName="" classNames="announcement-picture"/>*/}
                        </div>
                        <div className="city">
                            <p>Lokalizacja: Kraków</p> {/*{announcementData.city.name}*/}
                        </div>
                            <div className="calendar-container center">
                                <Calendar onChange={setDate} value={date} nextLabel={<ArrowNext/>} prevLabel={<ArrowPrevious/>} next2Label={<CaretNext/>} prev2Label={<CaretPrevious/>} selectRange={true} returnValue="range"/>
                            </div>
                            <div className="choosing-date-form center">
                                <form method="post" action={actionLink} id="reservation-form" onSubmit={handleSubmit}>
                                    <div className="from-container">
                                        <p className="label">Od: </p>
                                        <p className="reservationDate">{date[0] == null ? "" : `${dayOfWeek[date[0].getDay()]}, ${date[0].getDate()} ${months[date[0].getMonth()]} ${date[0].getFullYear()}`}</p>
                                    </div>
                                    <div className="to-container">
                                        <p className="label">Do: </p>
                                        <p className="reservationDate">{date[1] == null ? "" : `${dayOfWeek[date[1].getDay()]}, ${date[1].getDate()} ${months[date[1].getMonth()]} ${date[1].getFullYear()}`}</p>
                                    </div>
                                    <div id="button-container" className="center">
                                        <button type="submit" className="btn btn-warning" id="reservation-button">Zarezerwuj</button>
                                    </div>
                                </form>
                    </div>
                    </div>
                    <div className="announcement-bottom">
                        <div className="id">
                        ID: 3
                        </div> {/*{announcementData.id}*/}
                        <div className="publish-date">
                            <p>Opublikowano 5.10.12 o godzinie 17:12</p> {/*{announcementData.publishDate.slice(0, 10)}*/}
                        </div>
                        <div className="owner">
                            <p>Autor: Andrzej Śmietana</p> {/*{announcementData.owner.name}*/}
                        </div>
                    </div>
                {/*</>:<Spinner/>*/}
            {/*}*/}
        </div>
    )
}

export default AnnouncementPage