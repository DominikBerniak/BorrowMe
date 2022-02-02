import {Link} from "react-router-dom";

const UserInfoDropdown = ({hideDropDownMenu}) => {
    return (
        <div id="user-info-dropdown-container" className="d-flex flex-column bg-light rounded ps-4 py-3 border border-1" onMouseLeave={hideDropDownMenu}>
            <Link to="/" className="mb-3">Link 1</Link>
            <Link to="/" className="mb-3">Link 2</Link>
            <Link to="/" className="mb-3">Link 3</Link>
        </div>
    );
};

export default UserInfoDropdown;