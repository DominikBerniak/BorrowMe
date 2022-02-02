import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import UserInfoPanel from "./UserInfoPanel";
import {Link} from "react-router-dom";
import UserInfoDropdown from "./UserInfoDropdown";
import {useState} from "react";

const UserSection = () => {
    const [isMenuDown, setIsMenuDown] = useState(false);

    const showDropDownMenu = () => {
        if (!isMenuDown) {
            setIsMenuDown(true);
        }
    }
    const hideDropDownMenu = () => {
        setIsMenuDown(false);
    }

    return (
        <div id="navbar-user-section-container" className="d-flex ms-auto me-3 h-60 align-items-center">
            <Link to="/">
                <EmailOutlinedIcon id="navbar-messages-icon" sx={{fontSize: 35, color: "#ffffff"}}
                                   className="me-4"/>
            </Link>
            <NotificationsOutlinedIcon sx={{fontSize: 35, color: "#ffffff"}} className="me-5"
                                       id="navbar-notifications-icon"/>
            <UserInfoPanel showDropDownMenu={showDropDownMenu}/>
            {isMenuDown &&
                <UserInfoDropdown hideDropDownMenu={hideDropDownMenu}/>
            }
        </div>
    );
};

export default UserSection;