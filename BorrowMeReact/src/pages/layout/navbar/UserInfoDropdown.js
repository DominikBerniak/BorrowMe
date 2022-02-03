import {Link} from "react-router-dom";
import {useDetectClickOutside} from "react-detect-click-outside";

const UserInfoDropdown = ({hideDropDownMenu, userFirstName}) => {

    const ref = useDetectClickOutside({onTriggered: hideDropDownMenu});
    return (
        <div id="user-info-dropdown-container" className="list-group rounded-0" ref={ref}>
                <div className="list-group-item p-4 user-select-none" >
                    <p className="fw-bold">{userFirstName}</p>
                </div>
                <Link to="/" className="list-group-item">Mój profil</Link>
                <Link to="/" className="list-group-item">Moje ogłoszenia</Link>
                <Link to="/" className="list-group-item">Dodaj ogłoszenie</Link>
                <Link to="/" className="list-group-item">Wiadomości</Link>
                <div className="p-3 bg-light border border-top-0 border-bottom-0"></div>
                <Link to="/logout" className="list-group-item text-center">Wyloguj się</Link>
        </div>
    );
};

export default UserInfoDropdown;