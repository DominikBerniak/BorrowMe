import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getData} from "../services/apiFetch";

const UserPage = () => {
    const [userDetails, setDetails] = useState();
    const userId = useParams()
    useEffect(() => {
            let response = getData(`/api/users/${userId}/details`)
                .then(data => {
                    setDetails(data);
                })
        }, []
    )
    return (
        <>
            <p>Tu będzie strona użytkownika z wyświetlonymi wszystkimi jego ogłoszeniami</p>
            {userDetails &&
                <div>
                </div>
            }
        </>
    )
}

export default UserPage