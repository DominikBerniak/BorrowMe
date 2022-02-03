import { useEffect } from "react";
import { useState } from 'react';
import Announcement from "./layout/home/Announcement";

const Home = ({toggleLoginStatus}) => {
    const [announcements, setAnnouncemens] = useState([])
    const [isDataReady, setIsDataReady] = useState(false)

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const res = await fetch('api/Announcements');
            const data = await res.json();
            setAnnouncemens(data);
            setIsDataReady(true);
        }
        fetchAnnouncements();
        toggleLoginStatus(true);
    }, [])

    return (
        <div>
            {isDataReady
                ?   <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '20px', justifyContent: 'center'}}>
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