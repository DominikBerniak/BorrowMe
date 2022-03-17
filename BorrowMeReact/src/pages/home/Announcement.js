import './announcement.css'
import ImageAPI from "../../components/ImageAPI";
import {useNavigate} from "react-router-dom";
import NoImage from "../../components/NoImage";
import {getCorrectPaymentElem} from "../../services/announcementUtils";


const Announcement = ({ announcement }) => {
    const navigate = useNavigate();
    const handleAnnouncementClick = (announcementId) => {
        navigate(`/announcement/${announcementId}`)
    }
    
    return (
        <div className='announcement' onClick={() => handleAnnouncementClick(announcement.id)}>
            <div className="title">
                <b>{announcement.title}</b>
            </div>
            <div className="picture">
                {announcement.pictureLocations.length > 0 ?
                    <ImageAPI imageDirectory={announcement.pictureLocations[0].directoryName}
                        imageName={announcement.pictureLocations[0].fileName} classNames="announcement-image-tile"/>
                    :
                    <NoImage classNames="bg-light"/>
                }
            </div>
            <div className="informations-row">
                <div className="price center">
                    Cena: {getCorrectPaymentElem(announcement)}
                </div>
                <div className="city center">
                    {announcement.city ?
                        "Lokalizacja: " + announcement.city.name
                        :
                        <></>
                    }
                </div>
                <div className="category center">
                    Kategoria: {announcement.subCategory.name}
                </div>
            </div>
            <div className="informations-row-2">

            </div>
        </div>
    );
}

export default Announcement