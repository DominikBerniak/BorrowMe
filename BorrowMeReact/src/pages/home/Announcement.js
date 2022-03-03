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
            <div className="title" >
                <b>{announcement.title}</b>
            </div>
            <div className="picture">
                {announcement.pictureLocations.length > 0 ?
                    <ImageAPI imageDirectory={announcement.pictureLocations[0].directoryName}
                        imageName={announcement.pictureLocations[0].fileName} />
                    :
                    <NoImage classNames="bg-light"/>
                }
            </div>
            <div className="informations-row-1">
                <div className="price">
                    {getCorrectPaymentElem(announcement)}
                </div>
                <div className="city">
                    {announcement.city ?
                        announcement.city.name
                        :
                        <></>
                    }
                </div>
            </div>
            <div className="informations-row-2">
                <div className="date">
                    Kategoria: {announcement.subCategory.name}
                </div>
            </div>
        </div>
    );
}

export default Announcement