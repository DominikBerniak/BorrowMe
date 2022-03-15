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

import "./userPage/userPage.css"


const UserPage = () => {
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




    const [userDetails, setDetails] = useState();
    const { userId } = useParams()
    useEffect(() => {
        let response = getData(`/api/users/${userId}/details`)
            .then(data => {
                setDetails(data);
            })
    }, []
    )


    return (
        <>
            {userDetails ?
                <>
                    <div className="user-page-container">
                        <div className="item1">
                            <div className="avatar">
                                {userDetails.user.pictureLocation ?

                                    <Avatar sx={{ width: 225, height: 225 }}
                                        srcSet={`/api/StaticFiles/user-images/${userDetails.user.pictureLocation.fileName}`} />

                                    :
                                    <Avatar sx={{ width: 225, height: 225 }} />
                                }
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

                    <div className="item2">
                        <div className="user-details-container">
                            <div className="about-user-container">
                                <div className="user-name-container">
                                    <p>Ogłoszenia użytkownika {userDetails.user.firstName}:</p>
                                </div>
                            </div>
                            <div className="user-announcements-container center">
                                {userDetails.announcements.length > 0 ?
                                    <>
                                        {userDetails.announcements.map((announcement) => {
                                            return (
                                                <Announcement key={announcement.id} announcement={announcement} />
                                            )
                                        })}
                                    </>
                                    : <p className="">Użytkownik nie posiada żadnych ogłoszeń</p>}
                            </div>
                        </div>
                    </div>
                </>
                :
                <><Spinner /></>
            }
        </>
        // </>
    )
}



export default UserPage