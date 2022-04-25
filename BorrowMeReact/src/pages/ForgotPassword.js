import {Helmet} from "react-helmet";
import {useState} from "react";
import "./forgotPassword/ForgotPassword.css";
import {Link} from "react-router-dom";
import Spinner from "../components/Spinner";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSpinnerVisible(true);
        await fetch("/authentication/SendResetPasswordEmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email),
        }).then(() => {
            setIsSpinnerVisible(false);
            setIsEmailSent(true)
        });
    }

    return (
        <div id="forgot-password-main-container"
             className="d-flex flex-column mx-auto align-items-center user-select-none">
            <Helmet>
                <title>{"Nie pamiętam hasła | BorrowMe"}</title>
            </Helmet>
            <div id="forgot-password-header" className="w-100 py-2 text-center border-bottom border-5 user-select-none">
                Resetowanie hasła
            </div>
            {!isEmailSent ?
                <>
                    {!isSpinnerVisible ?
                        <>
                            <div className="mt-5">
                                Podaj swój adres email na który wyślemy Ci link resetujący hasło.
                            </div>
                            <form id="forgot-password-form" className="d-flex flex-column w-70 my-auto"
                                  spellCheck="false"
                                  onSubmit={handleSubmit}>
                                <label className="w-100 mb-3">Email:
                                    <input type="email" className="d-block w-100 rounded px-3 py-1"
                                           value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                                <button id="reset-password-button" type="submit" disabled={email===""}
                                        className="w-100 btn shadow-none rounded py-2">Resetuj hasło
                                </button>
                            </form>
                        </>
                        :
                        <div className="my-auto"><Spinner/></div>
                    }
                </>
                :
                <div className="my-auto d-flex flex-column align-items-center">
                    <div>Na podany adres email wysłaliśmy link wraz z instrukcją jak zresetować hasło</div>
                    <Link to="/" id="reset-password-main-page-button"
                          className="mt-4 w-50 btn shadow-none rounded py-2">Strona Główna</Link>
                </div>
            }


        </div>
    );
};

export default ForgotPassword;
