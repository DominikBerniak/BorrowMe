import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthUser } from "../../../../features/authUser";
import { clearUser } from "../../../../features/user";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const UserInfoDropdown = ({ hideDropDownMenu }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [wrongAuthenticationMessage, setWrongAuthenticationMessage] = useState("");
    const [passwordInputTimeout, setPasswordInputTimeout] = useState(null);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (passwordInputTimeout) {
            clearTimeout(passwordInputTimeout);
        }
        let passwordCheck = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (!passwordCheck.test(password) && password !== "") {
            setPasswordInputTimeout(
                setTimeout(() => {
                    setIsPasswordCorrect(false);
                }, 1000));
        } else {
            setIsPasswordCorrect(true)
        }
    }, [password])
    const ref = useDetectClickOutside({
        onTriggered: () => {
            console.log("outsite")
            if (!open) {
                hideDropDownMenu()
            }
        }
    });
    const user = useSelector(state => state.user.value);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await fetch("/authentication/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(() => {
            dispatch(clearAuthUser());
            dispatch(clearUser());
        })
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography component={'span'}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    const handleSubmit = (e) => {
        if (isPasswordCorrect) {
            console.log("true")
            e.preventDefault();
            let data =
            {
                password: password
            }
            handleReset(data);
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
            setWrongAuthenticationMessage("Hasło zmienione pomyślnie.");
        } else {
            console.log(JSON.stringify(registerData.password))
            console.log(response)
            setWrongAuthenticationMessage("Coś poszło nie tak :(");
        }
    }

    return (
        
        <div id="user-info-dropdown-container" className="list-group rounded-0" ref={!open ? ref : null}>
            <div className="list-group-item p-4 user-select-none">
                <p className="fw-bold">{user.firstName},</p>
                fajnie, że jesteś!
            </div>
            <Link to="/" className="list-group-item">Mój profil</Link>
            <Link to="/" className="list-group-item">Moje ogłoszenia</Link>
            <Link to="/" className="list-group-item">Dodaj ogłoszenie</Link>
            <Link to="/" className="list-group-item">Wiadomości</Link>
            <p className="list-group-item" onClick={handleOpen} style={{ cursor: "pointer" }}>Ustawienia</p>
            <div className="p-3 bg-light border border-top-0 border-bottom-0"></div>
            <Link to="" className="list-group-item text-center" onClick={handleLogout}>Wyloguj się</Link>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Dane personalne" {...a11yProps(0)} />
                                <Tab label="Zmiana hasła" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            Work in progress
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <><form id="authentication-form" className="d-flex flex-column w-70 my-auto" spellCheck="false"
                                onSubmit={handleSubmit}>
                                <label className="w-100 mb-1">Hasło:
                                    <div className="d-flex align-items-center">
                                        <input id="password-input" type={isPasswordHidden ? "password" : "text"}
                                            className={"d-block w-100 rounded px-3 py-1 " + (!isPasswordCorrect ? "incorrect-password" : "")}
                                            autoComplete="off" value={password}
                                             onChange={(e) => handlePasswordChange(e.target.value)}
                                             autoFocus
                                        />
                                        <div
                                            className={"password-eye-button d-flex align-items-center px-1 " + (!isPasswordCorrect ? "incorrect-password" : "")}
                                            onClick={togglePassword}>
                                            {isPasswordHidden ?
                                                <VisibilityOutlinedIcon sx={{ color: "#8c8c8c" }} />
                                                :
                                                <VisibilityOffOutlinedIcon sx={{ color: "#8c8c8c" }} />
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
                            </form></>
                            <button id="authenticate-button" form="authentication-form" type="submit" disabled={isPasswordCorrect && password !== ""? false : true}
                                className="w-100 btn shadow-none rounded py-2">zmień hasło</button>
                        </TabPanel>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default UserInfoDropdown;