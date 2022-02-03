import { useEffect } from "react";
import { useState } from 'react';
import Announcement from "./home/Announcement";

const Home = ({toggleLoginStatus}) => {
    const [announcements, setAnnouncements] = useState([])
    const [isDataReady, setIsDataReady] = useState(false)

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const res = await fetch('api/Announcements');
            const data = await res.json();
            setAnnouncements(data);
            setIsDataReady(true);
        }
        fetchAnnouncements();
        toggleLoginStatus(true);
    }, [])

    return (
        <div className="h-100">
            {isDataReady
                ?   <div className="d-flex flex-wrap justify-content-center">
                        {announcements.map((announcement) => {
                            return(
                            <Announcement key={announcement.id} announcement={announcement} />
                            )
                        })}
                    </div>
                : <></>}
        </div>
    );
};

export default Home;