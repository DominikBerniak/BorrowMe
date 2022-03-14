import {useParams, Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAuthUser} from "../services/getAuthUser";
import {changeAuthUser} from "../features/authUser";
import {getData} from "../services/apiFetch";
import {changeUser} from "../features/user";
import Spinner from "../components/Spinner";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


const UserPage = () => {
    const user = useSelector(state => state.user.value);
    const authUser = useSelector(state => state.authUser.value);
    const dispatch = useDispatch();
    useEffect(() => {
        getAuthUser()
            .then((user) => {
                if (!user.businessUserId) {
                    console.log("User not logged in")
                    dispatch(changeAuthUser({
                        status: "not-logged-in",
                        userId: "",
                        roles: ""
                    }))
                    return;
                }
                dispatch(changeAuthUser({
                    status: "logged-in",
                    userId: user.businessUserId,
                    roles: user.roles
                }))
            })
    }, [])

    useEffect(()=>{
        if (authUser.userId === "")
        {
            return;
        }
        console.log("fetching user data")
        getData(`/api/Users/${authUser.userId}`)
            .then(user=>{
                dispatch(changeUser({
                    userId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    pictureName: user.pictureLocation ? user.pictureLocation.fileName : "",
                    reputationPoints: user.reputationPoints
                }))
            })
    },[authUser])

    const [isAuthenticationInProgress, setIsAuthenticationInProgress] = useState(false);
    const [wrongAuthenticationMessage, setWrongAuthenticationMessage] = useState("");

    const [passwordInputTimeout, setPasswordInputTimeout] = useState(null);

    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const [password, setPassword] = useState("Admin123!");
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        if(isPasswordCorrect){
            console.log("true")
            e.preventDefault();
            setIsAuthenticationInProgress(true);
            let data =
                {
                    password: password
                }
                handleReset(data);
        }
        else{
            console.log("false")

        }
    }

    const handleReset = async (registerData) => {
        const response = await fetch("/authentication/resetPassword", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData.password)
        });
        if (response.ok) {
            console.log(JSON.stringify(registerData.password))
            console.log(response)
            setIsAuthenticationInProgress(false);
            setWrongAuthenticationMessage("Hasło zmienione pomyślnie.");
        } else {
            console.log(JSON.stringify(registerData.password))
            console.log(response)

            setIsAuthenticationInProgress(false);
            setWrongAuthenticationMessage("Coś poszło nie tak :(");
        }
    }

    useEffect(() => {
        if (passwordInputTimeout) {
            clearTimeout(passwordInputTimeout);
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

    const handlePasswordChange = (password) => {
        setPassword(password);
        if (wrongAuthenticationMessage !== "") {
            setWrongAuthenticationMessage("");
        }
    }

    const togglePassword = () => {
        setIsPasswordHidden(prev => !prev);
    }


    const userId = useParams()
    return (
        <>
        <p>Tu będzie strona użytkownika z wyświetlonymi wszystkimi jego ogłoszeniami</p>
        {user.userId ===  authUser.userId?
                        <><form id="authentication-form" className="d-flex flex-column w-70 my-auto" spellCheck="false"
                        onSubmit={handleSubmit}>
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
                  {isAuthenticationInProgress &&
                <div id="authentication-pending-spinner">
                    <Spinner/>
                </div>
            }
                  <button id="authenticate-button" form="authentication-form" type="submit" disabled={isPasswordCorrect ? false : true}
                        className="w-100 btn shadow-none rounded py-2">resetuj hasło</button>
                  </>
                        :
                        <>nie zalogowany</>
                    }
        </>

        
    )
}

export default UserPage