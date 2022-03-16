import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAuthUser } from "../services/getAuthUser";
import { changeAuthUser } from "../features/authUser";
import { getData } from "../services/apiFetch";
import { changeUser } from "../features/user";
import Spinner from "../components/Spinner";
import Announcement from "./home/Announcement";
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ReservationTile from "./userPage/ReservationTile";
import {Box, Link, Tab, Tabs} from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import {TabContext, TabList} from "@mui/lab";
import "./userPage/userPage.css"


const UserPage = () => {
    const authUser = useSelector(state => state.authUser.value);
    const dispatch = useDispatch();
    const {userId} = useParams()
    const [userDetails, setDetails] = useState();
    const [isSameUser, setIsSameUser] = useState(true);
    const [unacceptedReservations, setUnacceptedReservations] = useState([]);
    const [acceptedReservations, setAcceptedReservations] = useState([]);
    const [expiredReservations, setExpiredReservations] = useState([]);
    const [unacceptedAnnouncementReservations, setUnacceptedAnnouncementReservations] = useState([]);
    const [acceptedAnnouncementReservations, setAcceptedAnnouncementReservations] = useState([]);
    let setCorrectReservations = (reservation) => {
        if (!reservation.isAccepted && new Date(reservation.reservationEndDay) > new Date())
        {
            setUnacceptedReservations(unacceptedReservations => unacceptedReservations.concat(reservation))
            //próbne
            setAcceptedReservations(acceptedReservations => acceptedReservations.concat(reservation))
            setExpiredReservations(expiredReservations => expiredReservations.concat(reservation))
        }
        else if (reservation.isAccepted && new Date(reservation.reservationEndDay) > new Date()) {
            setAcceptedReservations(acceptedReservations => acceptedReservations.concat(reservation))
        }
        else if (reservation.isAccepted && new Date(reservation.reservationEndDay) < new Date())
        {
            setExpiredReservations(expiredReservations => expiredReservations.concat(reservation))
        }}
    const [value, setValue] = useState("1")
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

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

    useEffect(() => {
        if (authUser.userId === "") {
            return;
        }
        console.log("fetching user data")
        getData(`/api/Users/${authUser.userId}`)
            .then(user => {
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
    }, [authUser])

    useEffect(() => {
            let response = getData(`/api/users/${userId}/details`)
                .then(data => {
                    setDetails(data);
                    data.reservations.map(reservation => {
                        setCorrectReservations(reservation)
                    })
                })
        }, []
    )


    return (
    <>
        {userDetails ?
            <>
                <div className="user-page-container">
                    <div className="user-info">
                        <div className="avatar">
                            {userDetails.user.pictureLocation ?
                                <Avatar sx={{ width: 225, height: 225 }}
                                        srcSet={`/api/StaticFiles/user-images/${userDetails.user.pictureLocation.fileName}`} />
                                : <Avatar sx={{ width: 225, height: 225 }} />}
                        </div>
                        <div className="user-name">
                            <p>{userDetails.user.firstName} {userDetails.user.lastName}</p>
                        </div>
                        <div className="contact">Informacje kontaktowe:</div>
                        <div className="additonal-info">
                            <p><EmailIcon /> {userDetails.user.email}</p>
                            {userDetails.user.phoneNumber ?
                                <><p><PhoneIcon /> {userDetails.user.phoneNumber}</p></> : <></>
                            }
                        </div>
                    </div>
                </div>
                <div className="user-details-container">
                    <div className="user-announcements-container center">
                        {userDetails.announcements.length > 0 ?
                            <>
                                {userDetails.announcements.map((announcement) => {
                                    return (
                                        <Announcement key={announcement.id} announcement={announcement}/>
                                    )
                                })}
                            </>
                            : <label>{isSameUser ? "Nie posiadasz żadnych ogłoszeń" : "Użytkownik nie posiada żadnych ogłoszeń"}</label>}
                    </div>
                    {isSameUser ?
                        <>
                        <div className="user-reservations-container margin-top-1rem">
                            <label className="center">Twoje rezerwacje:</label>
                            {userDetails.reservations.length > 0 &&
                                <>
                                <Box className='margin-top-1rem' sx={{ width: '100%', justifyContent: "center" }}>
                                <TabContext value={value}>
                                    <Box>
                                        <TabList onChange={handleChange} TabIndicatorProps={{style: {display: "none"}}} textColor="primary" centered>
                                            <Tab label="Niezaakceptowane" value="1" disabled={unacceptedReservations.length===0}/>
                                            <Tab label="Zaakceptowane" value="2" disabled={acceptedReservations.length === 0}/>
                                            <Tab label="Wygaśnięte" value="3" disabled={expiredReservations.length===0}/>
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1" aria-label={unacceptedReservations.length === 0 && "disabled"}>
                                        <div className="unaccepted-reservations-container">
                                            {unacceptedReservations.map(reservation => {
                                                return <ReservationTile key={reservation.id} reservation={reservation}
                                                                        classNames="unaccepted-reservation-tile-container" isAccepted={false}/>
                                            })}
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <div className="accepted-reservations-container">
                                            {acceptedReservations.map(reservation => {
                                                return <ReservationTile key={reservation.id} reservation={reservation}
                                                                        classNames="accepted-reservation-tile-container"/>
                                            })}
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="3" aria-label={expiredReservations.length === 0 && "disabled"}>
                                        <div className="expired-reservation-tiles-container">
                                            {expiredReservations.map(reservation => {
                                                return <ReservationTile key={reservation.id} reservation={reservation}
                                                                        classNames="disable-reservation-tile-container" isExpired={true}/>
                                            })}
                                        </div>
                                    </TabPanel>
                                </TabContext>
                                </Box>
                                </>}
                        </div>
                        <div className="user-announcements-reservations margin-top-1rem">
                            <label className="center">Rezerwacje do twoich ogłoszeń:</label>
                            {userDetails.reservations === 0 ?
                            <div className="margin-top-1rem">
                                <div className="unaccepted-user-announcement-reservations-container">
                                    {unacceptedAnnouncementReservations.length > 0 ?
                                        <>
                                            <label>Niezaakceptowane rezerwacje:</label>
                                        </> : ""}
                                </div>
                                <div className="accepted-user-announcement-reservations-container">
                                    {acceptedAnnouncementReservations.length > 0 ?
                                        <>
                                            <label>Zaakceptowane rezerwacje:</label>
                                            {acceptedAnnouncementReservations.map(reservation => {
                                                console.log(reservation)
                                            })}
                                        </> : ""}
                                </div>
                            </div> : <label className="center margin-top-1rem" id="no-announcement-reservations-label">
                                    Nikt jeszcze niczego od Ciebie nie zarezerwował :(</label>}
                        </div>
                        </> : ""}
                    <div className="back-home-button-container center">
                        <button className="btn shadow-none homepage-button">
                            <Link className="home-page-link" to="/">Wróć do strony głownej</Link>
                        </button>
                    </div>
                </div>
            </> : <Spinner/>
        }
    </>
)}

export default UserPage