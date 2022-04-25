import "./announcementPage.css";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {useDetectClickOutside} from "react-detect-click-outside";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ImageAPI from "../../components/ImageAPI";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import {useState} from "react";

const AnnouncementPictureGallery = ({hideGallery, title, pictureLocations}) => {
    const ref = useDetectClickOutside({onTriggered: hideGallery});
    const [pictureIndex, setPictureIndex] = useState(0);
    const handlePreviousImage = () => {
        if (pictureIndex < pictureLocations.length - 1) {
            setPictureIndex(pictureIndex + 1);
        } else {
            setPictureIndex(0)
        }
    }
    const handleNextImage = () => {
        if (pictureIndex > 0) {
            setPictureIndex(pictureIndex - 1);
        } else {
            setPictureIndex(pictureLocations.length - 1)
        }
    }
    return (
        <div id="announcement-picture-gallery-main-container">
            <div id="announcement-picture-gallery-modal"  ref={ref}>
                <div className="d-flex w-100 align-items-center mt-3">
                    <h2 className="mx-auto ps-4">{title}</h2>
                    <div className="pe-4 cursor-pointer">
                        <ClearOutlinedIcon onClick={hideGallery} sx={{fontSize: 30, color: "#8c8c8c"}}/>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center h-90">
                    {pictureLocations.length > 1 &&
                        <ArrowBackIosNewOutlinedIcon sx={{width: 50, height: 50}} onClick={handlePreviousImage}
                            className="cursor-pointer ms-1"
                        />
                    }
                    <ImageAPI imageDirectory={pictureLocations[pictureIndex].directoryName} imageName={pictureLocations[pictureIndex].fileName}
                              classNames="announcement-gallery-picture mx-auto"/>
                    {pictureLocations.length > 1 &&
                        <ArrowForwardIosOutlinedIcon sx={{width: 50, height: 50}} onClick={handleNextImage}
                            className="cursor-pointer me-1"
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default AnnouncementPictureGallery;
