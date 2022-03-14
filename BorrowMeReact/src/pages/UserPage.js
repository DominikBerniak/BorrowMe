import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getData} from "../services/apiFetch";
import "./userPage/userPage.css"
import Announcement from "./home/Announcement";
import Spinner from "../components/Spinner";

const UserPage = () => {
    const [userDetails, setDetails] = useState();
    const {userId} = useParams()
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
                                : <p className="">Użytkownik nie posiada żadnych ogłoszeń</p>}
                        </div>
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
    )
}

export default UserPage