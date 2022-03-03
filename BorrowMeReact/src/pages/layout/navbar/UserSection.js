import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AddIcon from '@mui/icons-material/Add';
import UserInfoPanel from "./userSection/UserInfoPanel";
import {Link} from "react-router-dom";
import UserInfoDropdown from "./userSection/UserInfoDropdown";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getData} from "../../../services/apiFetch";
import {changeUser} from "../../../features/user";

const UserSection = () => {
    const [isMenuDown, setIsMenuDown] = useState(false);
    const authUser = useSelector(state=>state.authUser.value);
    const user = useSelector(state=>state.user.value);
    const dispatch = useDispatch();

    const showDropDownMenu = (e) => {
        if (!isMenuDown) {
            setIsMenuDown(true);
        }
    }
    const hideDropDownMenu = () => {
        setIsMenuDown(false);
    }

    useEffect(()=>{
        if (authUser.userId === "")
        {
            return;
        }
        getData(`/api/Users/${authUser.userId}`)
            .then(user=>{
                dispatch(changeUser({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    pictureName: user.pictureLocation ? user.pictureLocation.fileName : "",
                    reputationPoints: user.reputationPoints
                }))
            })
    },[authUser])

    return (
        <div id="navbar-user-section-container" className="d-flex ms-auto me-3 h-60 align-items-center">
            <Link to="/announcement/new">
                <AddIcon id="navbar-add-icon" sx={{fontSize: 35, color: "#ffffff"}} className="me-4"/>
            </Link>
            <Link to="/">
                <EmailOutlinedIcon id="navbar-messages-icon" sx={{fontSize: 35, color: "#ffffff"}}
                                   className="me-4"/>
            </Link>
            <Link to="/">
                <NotificationsOutlinedIcon sx={{fontSize: 35, color: "#ffffff"}} className="me-5"
                                           id="navbar-notifications-icon"/>
            </Link>
            <UserInfoPanel showDropDownMenu={showDropDownMenu}/>
            {isMenuDown &&
                <UserInfoDropdown hideDropDownMenu={hideDropDownMenu}/>
            }
        </div>
    );
};

export default UserSection;