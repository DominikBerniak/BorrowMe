import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./authentication/authentication.css"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {changeAuthUser} from "../features/authUser";
import {getAuthUser} from "../services/getAuthUser";
import Spinner from "../components/Spinner";

const Authentication = ({pageType}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("dominik@gmail.com");
    const [password, setPassword] = useState("Admin123!");

    const [passwordInputTimeout, setPasswordInputTimeout] = useState(null);


    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const [isAuthenticationInProgress, setIsAuthenticationInProgress] = useState(false);
    const [wrongAuthenticationMessage, setWrongAuthenticationMessage] = useState("");

    const authUser = useSelector(state => state.authUser.value);

    const {state} = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() =>
            () => clearTimeout(passwordInputTimeout)
        , [passwordInputTimeout]
    )
    useEffect(() => {
        if (authUser.userId !== "") {
            navigate("/")
            return;
        }

    }, [authUser])

    useEffect(() => {
        //Na potrzebe demo zakomentowane
        //setPassword("");
    }, [pageType])

    useEffect(() => {
        if (passwordInputTimeout) {
            clearTimeout(passwordInputTimeout);
        }
        if (pageType === "login" || password === "") {
            setIsPasswordCorrect(true);
            return;
        }
        let passwordCheck = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (!passwordCheck.test(password)) {
            setPasswordInputTimeout(
                setTimeout(() => {
                    setIsPasswordCorrect(false);
                }, 1000));
        } else {
            setIsPasswordCorrect(true)
        }
    }, [password])


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAuthenticationInProgress(true);
        let data =
            {
                email: email,
                password: password
            }
        if (pageType === "login") {
            handleLogin(data);

        } else {
            data =
                {
                    ...data,
                    firstName: firstName,
                    lastName: lastName
                }
            handleRegister(data);
        }
    }

    const handleRegister = async (registerData) => {
        const response = await fetch("/authentication/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });
        if (response.ok) {
            setIsAuthenticationInProgress(false);
            navigate("/login")
        } else {
            setIsAuthenticationInProgress(false);
            setWrongAuthenticationMessage("Ten adres email jest już zajęty.");
        }
    }
    const handleLogin = async (loginData) => {
        const response = await fetch("/authentication/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(loginData)
        });
        if (response.ok) {
            getAuthUser()
                .then(user => {
                    dispatch(changeAuthUser({
                        status: "logged-in",
                        userId: user.businessUserId,
                        roles: user.roles
                    }))
                    setIsAuthenticationInProgress(false);
                    navigate(state?.path || "/")
                })
        } else {
            setIsAuthenticationInProgress(false);
            setWrongAuthenticationMessage("Błędny email lub hasło.")
        }
    }

    const togglePassword = () => {
        setIsPasswordHidden(prev => !prev);
    }
    const handleFirstNameChange = (firstName) => {
        setFirstName(firstName);
        if (wrongAuthenticationMessage !== "") {
            setWrongAuthenticationMessage("");
        }
    }
    const handleLastNameChange = (lastName) => {
        setLastName(lastName);
        if (wrongAuthenticationMessage !== "") {
            setWrongAuthenticationMessage("");
        }
    }
    const handleEmailChange = (email) => {
        setEmail(email);
        if (wrongAuthenticationMessage !== "") {
            setWrongAuthenticationMessage("");
        }
    }
    const handlePasswordChange = (password) => {
        setPassword(password);
        if (wrongAuthenticationMessage !== "") {
            setWrongAuthenticationMessage("");
        }
    }
    return (
        <div id="authentication-main-container" className="d-flex flex-column mx-auto align-items-center">
            <Helmet>
                <title>{(pageType === "login" ? "Logowanie" : "Rejestracja") + " | BorrowMe"}</title>
            </Helmet>
            <div id="links-header" className="w-100 d-flex justify-content-center mb-3">
                <Link id="login-navigate-link" to="/login" className={"w-50 text-center py-2 border-bottom border-5 " +
                    (pageType === "login" ? "current-page-header" : "")} draggable="false">Logowanie</Link>
                <Link id="register-navigate-link" to="/register"
                      className={"w-50 text-center py-2 border-bottom border-5 "
                          + (pageType === "register" ? "current-page-header" : "")} draggable="false">Rejestracja</Link>
            </div>
            <form id="authentication-form" className="d-flex flex-column w-70 my-auto" spellCheck="false"
                  onSubmit={handleSubmit}>
                {pageType === "register" &&
                    <>
                        <label className="w-100 mb-3">Imię:
                            <input type="text" className="d-block w-100 rounded px-3 py-1"
                                   value={firstName} onChange={(e) => handleFirstNameChange(e.target.value)}
                            />
                        </label>
                        <label className="w-100 mb-3">Nazwisko:
                            <input type="text" className="d-block w-100 rounded px-3 py-1"
                                   value={lastName} onChange={(e) => handleLastNameChange(e.target.value)}
                            />
                        </label>
                    </>
                }
                <label className="w-100 mb-3">Email:
                    <input type="email" className="d-block w-100 rounded px-3 py-1"
                           value={email} onChange={(e) => handleEmailChange(e.target.value)}
                    />
                </label>
                <label className="w-100 mb-1">Hasło:
                    <div className="d-flex align-items-center">
                        <input id="password-input" type={isPasswordHidden ? "password" : "text"}
                               className={"d-block w-100 rounded px-3 py-1 " + (!isPasswordCorrect ? "incorrect-password" : "")}
                               autoComplete="off" value={password}
                               onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                        <div
                            className={"password-eye-button d-flex align-items-center px-1 " + (!isPasswordCorrect ? "incorrect-password" : "")}
                            onClick={togglePassword}>
                            {isPasswordHidden ?
                                <VisibilityOutlinedIcon sx={{color: "#8c8c8c"}}/>
                                :
                                <VisibilityOffOutlinedIcon sx={{color: "#8c8c8c"}}/>
                            }
                        </div>
                    </div>
                </label>
                <div id="password-check-message" className="text-center user-select-none">
                    {!isPasswordCorrect &&
                        <>
                            {password.length < 8 ?
                                <div>Hasło musi zawierać przynajmniej 8 znaków.</div>
                                :
                                <div>Hasło musi zawierać przynajmniej jedną wielką i jedną małą literę,
                                    cyfrę oraz znak specjalny.</div>
                            }
                        </>
                    }
                </div>
                <div id="wrong-authentication-message" className="text-center user-select-none">
                    {wrongAuthenticationMessage !== "" &&
                        <div>{wrongAuthenticationMessage}</div>
                    }
                </div>
            </form>
            <div className="d-flex flex-column align-items-center w-70 mt-auto mb-5">
                <button id="authenticate-button" form="authentication-form" type="submit"
                        className="w-100 btn shadow-none rounded py-2">{pageType === "login" ? "Zaloguj się" : "Zarejestruj się"}</button>
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
            {isAuthenticationInProgress &&
                <div id="authentication-pending-spinner">
                    <Spinner/>
                </div>
            }
        </div>
    );
};

export default Authentication;
