import {useEffect} from "react";
import {useState} from 'react';
import Announcement from "./home/Announcement";
import Spinner from "../components/Spinner";
import {getData} from "../services/apiFetch";
import {useDispatch} from "react-redux";
import {clearLocation} from "../features/location";
import {clearSearchPhrase} from "../features/searchPhrase";
import {clearCategory} from "../features/category";
import {clearCostFilter} from "../features/costFilter";
import {clearSort} from "../features/sort";

const Home = () => {
    const [announcements, setAnnouncements] = useState()
    const dispatch = useDispatch();

    useEffect(() => {
        clearAllSearchParams()
        getData("/Announcements")
            .then(announcementDto=>{
                setAnnouncements(announcementDto.announcements);
            })
    }, [])

    const clearAllSearchParams = () => {
        dispatch(clearSearchPhrase());
        dispatch(clearLocation());
        dispatch(clearCategory());
        dispatch(clearCostFilter());
        dispatch(clearSort());
    }

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