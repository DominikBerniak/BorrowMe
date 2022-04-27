import { useNavigate, useParams } from "react-router-dom";
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
import { Box, Link, Tab } from "@mui/material";
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from "@mui/lab";
import "./userPage/userPage.css"

const UserPage = () => {
    const authUser = useSelector(state => state.authUser.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userId} = useParams();
    const [dummyState, setDummyState] = useState(false);
    const [userDetails, setDetails] = useState();
    const [userReservationsUnaccepted, setUserUnaccepted] = useState([]);
    const [userReservationsAccepted, setUserAccepted] = useState([]);
    const [userReservationsExpired, setUserExpired] = useState([]);
    const [announcementsReservationsUnaccepted, setAnnouncementUnaccepted] = useState([]);
    const [announcementsReservationsAccepted, setAnnouncementAccepted] = useState([]);

    const clearArrays = () => {
        setUserUnaccepted([]);
        setUserAccepted([]);
        setUserExpired([]);
        setAnnouncementUnaccepted([]);
        setAnnouncementAccepted([]);
    }
    const [boxValues, setBoxValues] = useState({
        firstBox: userReservationsUnaccepted.length!==0 ? (userReservationsAccepted.length===0 ? "3" : "2") : "1",
        secondBox: announcementsReservationsUnaccepted.length!==0 ? "2" : "1"
    })
    const handleFirstContainerChange = (event, newValue) => {
        setBoxValues({...boxValues, firstBox: newValue});
    }
    const handleSecondContainerChange = (event, newValue) => {
        setBoxValues({...boxValues, secondBox: newValue});
    }
    let setCorrectReservations = (reservation, isAnnouncementReservation = false) => {
        if (!reservation.isAccepted && new Date(reservation.reservationEndDay) > new Date()) {
            if (isAnnouncementReservation)
            {
                setAnnouncementUnaccepted(announcementsReservationsUnaccepted.concat(reservation))
            } else
                setUserUnaccepted(userReservationsUnaccepted.concat(reservation))
        } else if (reservation.isAccepted && new Date(reservation.reservationEndDay) > new Date()) {
            if (isAnnouncementReservation)
            {
                setAnnouncementAccepted(announcementsReservationsUnaccepted.concat(reservation));
            } else
                setUserAccepted(userReservationsAccepted.concat(reservation))
        } else if (reservation.isAccepted && new Date(reservation.reservationEndDay) < new Date()) {
            setUserExpired(userReservationsExpired.concat(reservation));
        }
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
                    clearArrays()
                    data.userReservations.map(reservation => {
                        setCorrectReservations(reservation)
                    })
                    for (let i = 0; i < data.announcementReservations.length; i++)
                    {
                        data.announcementReservations[i].map(reservation => {
                            setCorrectReservations(reservation, true)
                        })
                    }
                })
        }, [dummyState]
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
                                        srcSet={`/api/StaticFiles/user-images/${userDetails.user.id}/avatar/${userDetails.user.pictureLocation.fileName}`} />
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
                                            <Announcement key={announcement.id} announcement={announcement} />
                                        )
                                    })}
                                </>
                                : <label className="margin-top-1rem center text-secondary">{authUser.userId === userId ? "Nie posiadasz żadnych ogłoszeń" : "Użytkownik nie posiada żadnych ogłoszeń"}</label>}
                        </div>
                        {authUser.userId === userId &&
                            <>
                                <div className="user-reservations-container margin-top-1rem">
                                    <label className="center">Twoje rezerwacje:</label>
                                    {userDetails.userReservations.length > 0 ?
                                        <>
                                            <Box className="margin-top-1rem" sx={{ width: '100%', justifyContent: "center" }}>
                                                <TabContext value={boxValues.firstBox}>
                                                    <Box>
                                                        <TabList onChange={handleFirstContainerChange} TabIndicatorProps={{ style: { display: "none" } }} textColor="primary" centered>
                                                            <Tab label="Niezaakceptowane" value="1" disabled={userReservationsUnaccepted.length === 0} />
                                                            <Tab label="Zaakceptowane" value="2" disabled={userReservationsAccepted.length === 0} />
                                                            <Tab label="Wygaśnięte" value="3" disabled={userReservationsExpired.length === 0} />
                                                        </TabList>
                                                    </Box>
                                                    <TabPanel value="1">
                                                        <div className="unaccepted-reservations-container">
                                                            {userReservationsUnaccepted.map(reservation => {
                                                                return <ReservationTile key={reservation.id} reservation={reservation}
                                                                    classNames="unaccepted-reservation-tile-container" isAccepted={false} state={dummyState} setState={setDummyState}/>
                                                            })}
                                                        </div>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                        <div className="accepted-reservations-container">
                                                            {userReservationsAccepted.map(reservation => {
                                                                return <ReservationTile key={reservation.id} reservation={reservation}
                                                                    classNames="accepted-reservation-tile-container" state={dummyState} setState={setDummyState}/>
                                                            })}
                                                        </div>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                        <div className="expired-reservation-tiles-container">
                                                            {userReservationsExpired.map(reservation => {
                                                                return <ReservationTile key={reservation.id} reservation={reservation}
                                                                    classNames="disable-reservation-tile-container" isExpired={true} state={dummyState} setState={setDummyState}/>
                                                            })}
                                                        </div>
                                                    </TabPanel>
                                                </TabContext>
                                            </Box>
                                        </> : <label className="margin-top-1rem center text-secondary">Nie masz żadnych rezerwacji</label>}
                                </div>
                                <div className="user-announcements-reservations margin-top-1rem">
                                    <label className="center">Rezerwacje do twoich ogłoszeń:</label>
                                    {userDetails.announcementReservations.length > 0 ?
                                        <Box className='margin-top-1rem' sx={{ width: '100%', justifyContent: "center" }}>
                                            <TabContext value={boxValues.secondBox}>
                                                <Box>
                                                    <TabList onChange={handleSecondContainerChange} TabIndicatorProps={{ style: { display: "none" } }} textColor="primary" centered>
                                                        <Tab label="Niezaakceptowane" value="1" disabled={announcementsReservationsUnaccepted.length === 0} />
                                                        <Tab label="Zaakceptowane" value="2" disabled={announcementsReservationsAccepted.length === 0} />
                                                    </TabList>
                                                </Box>
                                                <TabPanel value="1">
                                                    <div className="unaccepted-user-announcement-reservations-container">
                                                        {announcementsReservationsUnaccepted.map(reservation => {
                                                            return <ReservationTile key={reservation.id} reservation={reservation}
                                                                classNames="unaccepted-reservation-tile-container" isAccepted={false} isUserReservation={false} state={dummyState} setDummyState={setDummyState}/>
                                                        })}
                                                    </div>
                                                </TabPanel>
                                                <TabPanel value="2">
                                                    <div className="accepted-user-announcement-reservations-container">
                                                        {announcementsReservationsAccepted.map(reservation => {
                                                            return <ReservationTile key={reservation.id} reservation={reservation}
                                                                classNames="accepted-reservation-tile-container" isUserReservation={false} state={dummyState} setState={setDummyState}/>
                                                        })}
                                                    </div>
                                                </TabPanel>
                                            </TabContext>
                                        </Box> : <label className="margin-top-1rem center text-secondary">{userDetails.announcements.length > 0 ? "Nikt niczego jeszcze od Ciebie nie zarezerwował." : "Nie posiadasz żadnych ogłoszeń."}</label>}
                                </div>
                            </>}
                        <div className="back-home-button-container center">
                            <button className="btn homepage-button" onClick={() => navigate("/")}>Wróć do strony głównej
                            </button>
                        </div>
                    </div>
                </> : <Spinner />
            }
        </>
    )
}

export default UserPage
