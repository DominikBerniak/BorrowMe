import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getData} from "../services/apiFetch";
import "./userPage/userPage.css"
import Announcement from "./home/Announcement";
import Spinner from "../components/Spinner";
import ReservationTile from "./userPage/ReservationTile";
import {Box, Tab, Tabs} from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import {TabContext, TabList} from "@mui/lab";

    const UserPage = () => {
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
                <div className="user-details-container">
                    <div className="about-user-container">
                        <div className="user-name-container">
                            <p>{userDetails.user.firstName}</p>
                        </div>
                    </div>
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
                            </div> : <label className="center" id="no-announcement-reservations-label">
                                    Nikt jeszcze niczego od Ciebie nie zarezerwował :(</label>}
                        </div>
                        </> : ""}
                    <div className="back-home-button-container center">
                        <button className="btn shadow-none homepage-button">
                            <Link className="home-page-link" to="/">Wróć do strony głownej</Link>
                        </button>
                    </div>
                </div>
            </> :
            <Spinner/>
        }
    </>
)}

export default UserPage