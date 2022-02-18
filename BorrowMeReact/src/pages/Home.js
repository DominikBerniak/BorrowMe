import {useEffect} from "react";
import {useState} from 'react';
import Announcement from "./home/Announcement";
import Spinner from "../components/Spinner";
import {getData} from "../services/apiFetch";
import "./home/home.css"

const Home = () => {
    const [announcements, setAnnouncements] = useState()

    useEffect(() => {
        getData("/Announcements")
            .then(announcements=>{
                setAnnouncements(announcements);
            })
    }, [])

    return (
        <div>
            <h2 className="text-center">Promowane ogłoszenia</h2>
            {announcements
                ? <div className="d-flex flex-wrap justify-content-center">
                    {announcements.map((announcement) => {
                        return (
                            <Announcement key={announcement.id} announcement={announcement}/>
                        )
                    })}
                </div>
                :
                <Spinner/>
            }
        </div>
    );
};

export default Home;