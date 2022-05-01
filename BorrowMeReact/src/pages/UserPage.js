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
import {Helmet} from "react-helmet";

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
    const [announcementsReservationsExpired, setAnnouncementExpired] = useState([]);
    const [firstBox, setFirstBoxValue] = useState(userReservationsUnaccepted.length===0 ? (userReservationsAccepted.length===0 ? "3" : "2") : "1")
    const [secondBox, setSecondBoxValue] = useState(announcementsReservationsUnaccepted.length===0 ? "2" : "1")

    const clearArrays = () => {
        setUserUnaccepted([]);
        setUserAccepted([]);
        setUserExpired([]);
        setAnnouncementUnaccepted([]);
        setAnnouncementAccepted([]);
        setAnnouncementExpired([]);
    }

    let onChangeFirstBox = (event, value) => {
        setFirstBoxValue(value);
    }

    let onChangeSecondBox = (event, value) => {
        setSecondBoxValue(value);
    }

    let setUserReservations = (reservation) => {
        if (!reservation.isAccepted && new Date(reservation.reservationEndDay) > new Date()) {
            setUserUnaccepted(userReservationsUnaccepted => userReservationsUnaccepted.concat(reservation))
        } else if (reservation.isAccepted && new Date(reservation.reservationEndDay) > new Date()) {
            setUserAccepted(userReservationsAccepted => userReservationsAccepted.concat(reservation))
        } else if (reservation.isAccepted && new Date(reservation.reservationEndDay) < new Date()) {
            setUserExpired(userReservationsExpired => userReservationsExpired.concat(reservation));
        }
    }

    let setAnnouncementReservations = (reservation) => {
        if (!reservation.isAccepted && new Date(reservation.reservationEndDay) > new Date()) {
            setAnnouncementUnaccepted(announcementsReservationsUnaccepted => announcementsReservationsUnaccepted.concat(reservation))
        } else if (reservation.isAccepted && new Date(reservation.reservationEndDay) > new Date()) {
            setAnnouncementAccepted(announcementsReservationsAccepted=>announcementsReservationsAccepted.concat(reservation));
        } else if (reservation.isAccepted && new Date(reservation.reservationEndDay) < new Date()) {
            setAnnouncementExpired(announcementsReservationsExpired => announcementsReservationsExpired.concat(reservation));
        }
    }

    let checkIfOtherTypesExceptUnacceptedAndExpired = (reservations) => {
        for (let i = 0; i < reservations.length; i++)
        {
            for (let j = 0; j < reservations[i].length; j++)
            {
                if (new Date(reservations[i][j].reservationEndDay) > new Date() && reservations[i][j].isAccepted)
                {
                    return true;
                }
            }
        }
        return false;
    }

    useEffect(() => {
        setFirstBoxValue(userReservationsUnaccepted.length===0 ? (userReservationsAccepted.length===0 ? "3" : "2") : "1");
        setSecondBoxValue(announcementsReservationsUnaccepted.length===0 ? (announcementsReservationsAccepted.length===0 ? "3" : "2") : "1");
    }, [userReservationsUnaccepted.length, userReservationsAccepted.length, announcementsReservationsUnaccepted.length, announcementsReservationsAccepted.length])


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
                    console.log(data.userReservations)
                    data.userReservations.map(reservation => {
                        setUserReservations(reservation)
                    })
                    console.log(data.announcementReservations)
                    for (let i = 0; i < data.announcementReservations.length; i++)
                    {
                        data.announcementReservations[i].map(reservation => {
                            setAnnouncementReservations(reservation)
                        })
                    }
                })
        }, [dummyState]
    )

    return (
        <>
            <Helmet>
                <title>Strona użytkownika {userDetails.user.firstName} | BorrowMe</title>
            </Helmet>
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
                                                <TabContext value={firstBox}>
                                                    <Box>
                                                        <TabList onChange={onChangeFirstBox} TabIndicatorProps={{ style: { display: "none" } }} textColor="primary" centered>
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
                                                        <div className="expired-reservations-container">
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
                                    {userDetails.announcementReservations.length > 0 && checkIfOtherTypesExceptUnacceptedAndExpired(userDetails.announcementReservations) ?
                                        <Box className='margin-top-1rem' sx={{ width: '100%', justifyContent: "center" }}>
                                            <TabContext value={secondBox}>
                                                <Box>
                                                    <TabList onChange={onChangeSecondBox} TabIndicatorProps={{ style: { display: "none" } }} textColor="primary" centered>
                                                        <Tab label="Niezaakceptowane" value="1" disabled={announcementsReservationsUnaccepted.length === 0} />
                                                        <Tab label="Zaakceptowane" value="2" disabled={announcementsReservationsAccepted.length === 0} />
                                                        <Tab label="Wygaśnięte" value="3" disabled={announcementsReservationsExpired.length === 0} />
                                                    </TabList>
                                                </Box>
                                                <TabPanel value="1">
                                                    <div className="unaccepted-announcement-reservations-container">
                                                        {announcementsReservationsUnaccepted.map(reservation => {
                                                            return <ReservationTile key={reservation.id} reservation={reservation}
                                                                classNames="unaccepted-reservation-tile-container" isAccepted={false} isUserReservation={false} state={dummyState} setDummyState={setDummyState}/>
                                                        })}
                                                    </div>
                                                </TabPanel>
                                                <TabPanel value="2">
                                                    <div className="accepted-announcement-reservations-container">
                                                        {announcementsReservationsAccepted.map(reservation => {
                                                            return <ReservationTile key={reservation.id} reservation={reservation}
                                                                classNames="accepted-reservation-tile-container" isUserReservation={false} state={dummyState} setState={setDummyState} />
                                                        })}
                                                    </div>
                                                </TabPanel>
                                                <TabPanel value="3">
                                                    <div className="expired-announcement-reservations-container">
                                                        {announcementsReservationsExpired.map(reservation => {
                                                            return <ReservationTile key={reservation.id} reservation={reservation}
                                                                   classNames="disable-reservation-tile-container" isExpired={true} isUserReservation={false} state={dummyState} setDummyState={setDummyState}/>
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
