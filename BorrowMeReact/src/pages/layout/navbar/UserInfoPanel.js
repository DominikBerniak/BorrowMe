import Avatar from '@mui/material/Avatar';
import ImageAPI from "../../../components/ImageAPI";
import bobr from "../../../images/bobr.jpg";


const UserInfoPanel = ({showDropDownMenu, userData}) => {
    return (
        <div id="user-info-panel-container" className="d-flex h-100 align-items-center bg-light rounded rounded-pill"
             onMouseOver={showDropDownMenu} onClick={showDropDownMenu}>
            <div className="ps-4 pe-2 user-select-none">{userData.firstName}</div>
            <Avatar sx={{width: 45, height: 45}} src={bobr}>
                {/*<ImageAPI imageDirectory="user-images" imageName="bobr.jpg" classNames="w-100 h-100"/>*/}
            </Avatar>
        </div>
    );
};

export default UserInfoPanel;