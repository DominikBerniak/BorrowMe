import {Link} from "react-router-dom";
import {useDetectClickOutside} from "react-detect-click-outside";
import {useDispatch, useSelector} from "react-redux";
import {clearAuthUser} from "../../../../features/authUser";
import {clearUser} from "../../../../features/user";

const UserInfoDropdown = ({hideDropDownMenu}) => {

    const ref = useDetectClickOutside({onTriggered: hideDropDownMenu});
    const user = useSelector(state => state.user.value);
    const dispatch = useDispatch();
    const handleLogout = async() => {
        await fetch("/authentication/logout",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(()=>{
            dispatch(clearAuthUser());
            dispatch(clearUser());
        })
    }
    return (
        <div id="user-info-dropdown-container" className="list-group rounded-0" ref={ref}>
            <div className="list-group-item p-4 user-select-none">
                <p className="fw-bold">{user.firstName},</p>
                fajnie, że jesteś!
            </div>
            <Link to="/" className="list-group-item">Mój profil</Link>
            <Link to="/" className="list-group-item">Moje ogłoszenia</Link>
            <Link to="/" className="list-group-item">Dodaj ogłoszenie</Link>
            <Link to="/" className="list-group-item">Wiadomości</Link>
            <div className="p-3 bg-light border border-top-0 border-bottom-0"></div>
            <Link to="/" className="list-group-item text-center" onClick={handleLogout}>Wyloguj się</Link>
        </div>
    );
};

export default UserInfoDropdown;