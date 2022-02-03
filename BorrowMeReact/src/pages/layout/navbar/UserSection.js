import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import UserInfoPanel from "./UserInfoPanel";
import {Link} from "react-router-dom";
import UserInfoDropdown from "./UserInfoDropdown";
import {useState} from "react";


const userData = {
    firstName: "Dominik",
    avatarPath: "../../../images/bobr.jpg"
}


const UserSection = ({isLoggedIn}) => {
    const [isMenuDown, setIsMenuDown] = useState(false);

    const showDropDownMenu = (e) => {
        if (!isMenuDown) {
            setIsMenuDown(true);
        }
    }
    const hideDropDownMenu = () => {
        setIsMenuDown(false);
    }

    return (
        <div id="navbar-user-section-container" className="d-flex ms-auto me-3 h-60 align-items-center">
            {isLoggedIn &&
                <>
                    <Link to="/">
                        <EmailOutlinedIcon id="navbar-messages-icon" sx={{fontSize: 35, color: "#ffffff"}}
                                           className="me-4"/>
                    </Link>
                    <NotificationsOutlinedIcon sx={{fontSize: 35, color: "#ffffff"}} className="me-5"
                                               id="navbar-notifications-icon"/>
                    <UserInfoPanel showDropDownMenu={showDropDownMenu} userData={userData}/>
                    {isMenuDown &&
                        <UserInfoDropdown hideDropDownMenu={hideDropDownMenu} userFirstName={userData.firstName}/>
                    }
                </>
            }
            {!isLoggedIn &&
                <Link to="/" className="btn btn-primary">Login</Link>
            }
        </div>
    );
};

export default UserSection;