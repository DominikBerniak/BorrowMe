import DeleteIcon from '@mui/icons-material/Delete';
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { useState} from "react";

const AddedImage = ({image, index, handleDeleteImage}) => {
    const [isImageHovered, setIsImageHovered] = useState(false);

    return (
        <div className="add-announcement-image-container d-flex justify-content-center align-items-center p-2 rounded m-3"
             onMouseOver={()=>setIsImageHovered(true)}
             onMouseLeave={()=>setIsImageHovered(false)}
        >
            {image!== "" ?
                <>
                    <img className="add-announcement-image" src={image}/>
                    {isImageHovered &&
                        <div className="position-absolute cursor-pointer">
                            <DeleteIcon sx={{fontSize: 60, color: "white"}}
                                                onClick={()=>handleDeleteImage(index)}/>
                        </div>
                    }
                </>
                :
                <div>
                    <InsertPhotoOutlinedIcon sx={{fontSize: 50, color:"#646464"}}/>
                </div>
            }
        </div>
    );
};

export default AddedImage;