import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./authentication/authentication.css"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const Authentication = ({pageType}) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    useEffect(()=>{
       document.title = (pageType === "login" ? "Logowanie" : "Rejestracja") + " | BorrowMe";
    },[pageType])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("auth submit")
    }
    const togglePassword = () => {
        setIsPasswordHidden(prev=>!prev);
    }
    return (
        <div id="authentication-main-container" className="d-flex flex-column mx-auto align-items-center">
            <div id="links-header" className="w-100 d-flex justify-content-center mb-3">
                <Link id="login-navigate-link" to="/login" className={"w-50 text-center py-2 border-bottom border-5 " + (pageType === "login" ? "current-page-header" : "")} draggable="false">Logowanie</Link>
                <Link id="register-navigate-link" to="/register" className={"w-50 text-center py-2 border-bottom border-5 " + (pageType === "register" ? "current-page-header" : "")} draggable="false">Rejestracja</Link>
            </div>
            <form id="authentication-form" className="d-flex flex-column w-70 my-auto" onSubmit={handleSubmit}>
                {pageType === "register" &&
                    <>
                    <label className="w-100 mb-3">Imię:
                        <input type="text" className="d-block w-100 rounded px-3 py-1"/>
                    </label>
                    <label className="w-100 mb-3">Nazwisko:
                        <input type="text" className="d-block w-100 rounded px-3 py-1"/>
                    </label>
                    </>
                }
                <label className="w-100 mb-3">Email:
                    <input type="email" className="d-block w-100 rounded px-3 py-1"/>
                </label>
                <label className="w-100 mb-3">Hasło:
                    <div className="d-flex align-items-center">
                        <input id="password-input" type={isPasswordHidden ? "password" : "text"} className="d-block w-100 rounded px-3 py-1" autoComplete="off"/>
                        <div className="password-eye-button d-flex align-items-center px-1" onClick={togglePassword}>
                            {isPasswordHidden?
                                <VisibilityOutlinedIcon sx={{color: "#8c8c8c"}}/>
                                :
                                <VisibilityOffOutlinedIcon sx={{color: "#8c8c8c"}}/>
                            }

                        </div>
                    </div>

                </label>
            </form>
            <div className="d-flex flex-column align-items-center w-70 mt-auto mb-5">
                <button id="authenticate-button" form="authentication-form" type="submit" className="w-100 btn shadow-none rounded py-2">{pageType === "login" ? "Zaloguj się" : "Zarejestruj się"}</button>
                <div className="d-flex w-100 justify-content-center my-4 align-items-center">
                    <hr className="w-50"/>
                    <div className="px-3 user-select-none">lub</div>
                    <hr className="w-50"/>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <button id="facebook-button" className="btn shadow-none">Facebook</button>
                    <button id="google-button" className="btn shadow-none">Google</button>
                </div>
            </div>
        </div>
    );
};

export default Authentication;