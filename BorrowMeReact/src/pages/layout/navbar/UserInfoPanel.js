import bobr from "../../../images/bobr.jpg";
import Avatar from '@mui/material/Avatar';


const UserInfoPanel = ({showDropDownMenu, userData}) => {
    return (
        <div id="user-info-panel-container" className="d-flex h-100 align-items-center bg-light rounded rounded-pill"
             onMouseOver={showDropDownMenu} onClick={showDropDownMenu}>
            <div className="ps-4 pe-2 user-select-none">{userData.firstName}</div>
            <Avatar src={bobr} sx={{width: 45, height: 45}}/>
        </div>
    );
};

export default UserInfoPanel;