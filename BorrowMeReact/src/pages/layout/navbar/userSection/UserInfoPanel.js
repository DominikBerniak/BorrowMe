import Avatar from '@mui/material/Avatar';
import {useSelector} from "react-redux";

const UserInfoPanel = ({showDropDownMenu}) => {
    const user = useSelector(state=>state.user.value);
    return (
        <div id="user-info-panel-container" className="d-flex h-100 align-items-center bg-light rounded rounded-pill"
             onMouseOver={showDropDownMenu} onClick={showDropDownMenu}>
            <div className="ps-4 pe-2 user-select-none">{user.firstName}</div>
            {user.pictureName !== "" ?
                <Avatar sx={{width: 45, height: 45}} src={`/api/StaticFiles/user-images/${user.userId}/${user.pictureName}`}/>
                :
                <Avatar sx={{width: 45, height: 45}}/>
            }
        </div>
    );
};

export default UserInfoPanel;
