import {Link} from "react-router-dom";
import {useDetectClickOutside} from "react-detect-click-outside";

const UserInfoDropdown = ({hideDropDownMenu, userFirstName}) => {

    const ref = useDetectClickOutside({onTriggered: hideDropDownMenu});
    return (
        <div id="user-info-dropdown-container" className="list-group rounded-0" ref={ref}>
                <div className="list-group-item p-4 user-select-none" >
                    <p className="fw-bold">{userFirstName}</p>
                </div>
                <Link to="/" className="list-group-item">Link 1</Link>
                <Link to="/" className="list-group-item">Link 2</Link>
                <Link to="/" className="list-group-item">Link 3</Link>
        </div>
    );
};

export default UserInfoDropdown;