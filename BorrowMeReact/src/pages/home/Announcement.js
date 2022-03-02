import './announcement.css'
import ImageAPI from "../../components/ImageAPI";
import {useNavigate} from "react-router-dom";


const Announcement = ({ announcement }) => {
    const navigate = useNavigate();
    const handleAnnouncementClick = (announcementId) => {
        navigate(`/announcement/${announcementId}`)
    }
    
    return (
        <div className='announcement' onClick={() => handleAnnouncementClick(announcement.id)}>
            {console.log(announcement)}
            <div className="title" >
                <b>{announcement.title}</b>
            </div>
            <div className="picture">
                {announcement.pictureLocations.length > 0 ?
                    <ImageAPI imageDirectory={announcement.pictureLocations[0].directoryName}
                        imageName={announcement.pictureLocations[0].fileName} />
                    :
                    <ImageAPI imageDirectory='site-images' imageName='noPicture.png'/>
                }
            </div>
            <div className="informations-row-1">
                <div className="price">
                    {announcement.paymentType === 0 && 
                    <>za darmo</>}
                    {announcement.paymentType === 1 &&
                    <>{announcement.price} zł</>}
                    {announcement.paymentType === 2 &&
                    <>za piwo</>}
                    {announcement.paymentType === 3 &&
                    <>{announcement.otherPaymentType}</>}
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
                    {announcement.subCategory.name}
                </div>
            </div>
        </div>
    );
}

export default Announcement