import Spinner from "../../components/Spinner";
import ImageAPI from "../../components/ImageAPI";
import NoImage from "../../components/NoImage";
import {useNavigate} from "react-router-dom";
import Rating from '@mui/material/Rating';

const SearchResultsAnnouncements = ({announcements}) => {
    const navigate = useNavigate();
    const handleAnnouncementClick = (announcementId) => {
        navigate(`/announcement/${announcementId}`)
    }
    return (
        <div id="search-results-container" className="d-flex flex-column align-items-center py-4">
            {announcements ?
                announcements.map(announcement =>
                <div key={announcement.id} className="search-results-announcement d-flex w-100 mb-2 p-4">
                    <div className="w-25 h-100 hover-pointer" onClick={() => handleAnnouncementClick(announcement.id)}>
                        {announcement.pictureLocations.length > 0 ?
                            <ImageAPI imageDirectory={announcement.pictureLocations[0].directoryName}
                                      imageName={announcement.pictureLocations[0].fileName}
                                      classNames="search-results-announcement-image search-results-announcement-image-generic"/>
                            :
                            <NoImage classNames="h4 search-results-announcement-image-generic"/>
                        }
                    </div>
                    <div className="d-flex flex-column align-items-end w-75">
                        <div
                            className="d-flex flex-column align-items-end pb-2 mb-2 search-results-announcement-header">
                            <h3 className="search-results-announcement-title hover-pointer"
                                onClick={() => handleAnnouncementClick(announcement.id)}>{announcement.title}</h3>
                            {announcement.paymentType === 0 && 
                            <div className="h4 text-secondary">za darmo</div>}
                            {announcement.paymentType === 1 &&
                            <div className="h4 text-secondary">{announcement.price} zł / dzień</div>}
                            {announcement.paymentType === 2 &&
                            <div className="h4 text-secondary">{announcement.otherPaymentType}za piwo</div>}
                            {announcement.paymentType === 3 &&
                            <div className="h4 text-secondary">{announcement.otherPaymentType}</div>}
                        </div>
                        <div className="search-results-announcement-desc d-flex flex-column align-items-end pb-3 mb-2">
                            <div>{announcement.city.name}, {announcement.voivodeship.name}</div>
                            <div>najbliższy wolny termin: wtorek</div>
                        </div>
                        <div className="search-results-announcement-footer w-95 d-flex flex-column align-items-end">
                            <div>pożyczyło: {Math.floor(Math.random() * 1000) + 1} osób</div>
                            <div className="d-flex">
                                <div>ocena:</div>
                                <Rating name="half-rating-read" defaultValue={(Math.random() * 5) + 1} precision={0.1}
                                        readOnly/>
                            </div>
                        </div>
                    </div>
                </div>)
                :
                <Spinner />
            }
        </div>
    );
};

export default SearchResultsAnnouncements;