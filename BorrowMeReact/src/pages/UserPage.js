import {useParams} from "react-router-dom";

const UserPage = () => {
    const userId = useParams()
    return (
        <p>Tu będzie strona użytkownika z wyświetlonymi wszystkimi jego ogłoszeniami</p>
    )
}

export default UserPage