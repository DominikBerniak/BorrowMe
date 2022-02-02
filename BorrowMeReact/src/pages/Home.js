import { useEffect } from "react";
import { useState } from 'react';
import Announcement from "./layout/home/Announcement";

const Home = () => {
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
    }, [])

    return (
        <div style={{height: "150vh"}}>
            {isDataReady
                ?   <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '100px'}}>
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