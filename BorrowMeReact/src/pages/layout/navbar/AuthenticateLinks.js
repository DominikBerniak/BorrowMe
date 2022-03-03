import {Link} from "react-router-dom";

const AuthenticateLinks = () => {
    return (
        <div id="auth-links-container" className="ms-auto me-3 d-flex justify-content-around align-items-center w-25 h-60 user-select-none">
            <Link to="/login" className="btn btn-outline-light h-100 w-40 d-flex align-items-center justify-content-center shadow-none">Zaloguj się</Link>
            <Link to="/register" className="btn btn-outline-light h-100 w-40 d-flex align-items-center justify-content-center shadow-none">Zarejestruj się</Link>
        </div>
    );
};

export default AuthenticateLinks;