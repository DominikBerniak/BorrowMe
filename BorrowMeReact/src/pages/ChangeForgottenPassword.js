import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import "./changeForgottenPassword/ChangeForgottenPassword.css";
import "./authentication/authentication.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Spinner from "../components/Spinner";

const ChangeForgottenPassword = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordInputTimeout, setPasswordInputTimeout] = useState(null);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [wrongAuthenticationMessage, setWrongAuthenticationMessage] = useState("");
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    useEffect(() => {
        let token = searchParams.get("token");
        if (token === "" || token === null || token === undefined) {
            navigate("/");
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsFormSubmitted(true);
        let data = {
            email : email,
            newPassword: password,
            token: searchParams.get("token")
        };
        const response = await fetch("/authentication/ResetForgottenPassword", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            setIsFormSubmitted(false);
            navigate("/login")
        } else {
            setIsFormSubmitted(false);
            setWrongAuthenticationMessage("Coś poszło nie tak, spróbuj ponownie.");
        }
    }

    useEffect(() =>
            () => clearTimeout(passwordInputTimeout)
        , [passwordInputTimeout]
    )

    useEffect(() => {
        setIsSubmitDisabled(true);
        if (passwordInputTimeout) {
            clearTimeout(passwordInputTimeout);
        }
        if (password === "") {
            setIsPasswordCorrect(true);
            return;
        }
        let passwordCheck = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (!passwordCheck.test(password)) {
            setIsSubmitDisabled(true);
            setPasswordInputTimeout(
                setTimeout(() => {
                    setIsPasswordCorrect(false);
                }, 1000));
        } else {
            setIsSubmitDisabled(false);
            setIsPasswordCorrect(true)
        }
    }, [password])

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
    const togglePassword = () => {
        setIsPasswordHidden(prev => !prev);
    }

    return (
        <div id="change-password-main-container"
             className="d-flex flex-column mx-auto align-items-center user-select-none">
            <Helmet>
                <title>{"Zmiana hasła | BorrowMe"}</title>
            </Helmet>
            <div id="change-password-header" className="w-100 py-2 text-center border-bottom border-5 user-select-none">
                Zmiana hasła
            </div>
            {isFormSubmitted ?
                <div className="my-auto">
                    <Spinner />
                </div>
                :
                <>
                    <div className="mt-5">
                        Podaj swój adres email oraz nowe hasło.
                    </div>
                    <form id="change-password-form" className="d-flex flex-column w-70 mt-4"
                          spellCheck="false"
                          onSubmit={handleSubmit}>
                        <label className="w-100 mb-3">Email:
                            <input type="email" className="d-block w-100 rounded px-3 py-1"
                                   value={email} onChange={(e) => handleEmailChange(e.target.value)}
                            />
                        </label>
                        <label className="w-100 mb-1">Nowe Hasło:
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
                        <button id="change-password-button" type="submit" disabled={isSubmitDisabled}
                                className="w-100 btn shadow-none rounded py-2 mb-5">Zmień hasło
                        </button>
                    </form>
                </>
            }
        </div>
    );
};

export default ChangeForgottenPassword;
