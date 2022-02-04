import FiltersPanel from "./searchResults/FiltersPanel";
import SortingPanel from "./searchResults/SortingPanel";
import {useEffect, useState} from "react";
import {getData} from "../services/apiFetch";
import {useSearchParams} from "react-router-dom";


const SearchResults = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [paginatedAnnouncements, setPaginatedAnnouncements] = useState([]);
    const [currentPageAnnouncements, setCurrentPageAnnouncements] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageNumber, setPageNumber] = useState(0);
    const numberOfAnnouncementsPerPage = 2;

    useEffect(() => {
        const pageNum = searchParams.get("page");
        setPageNumber(pageNum === null ? 1 : parseInt(pageNum));
        if (!isDataFetched) {
            getData("api/Announcements")
                .then(announcements => {
                    setAnnouncements(announcements)
                })
            setIsDataFetched(true);
        }
    }, [])

    useEffect(() => {
        if (pageNumber === 1) {
            setSearchParams({});
        }
    }, [pageNumber])

    const paginateAnnouncements = () => {
        let paginatedAnnouncements = [];
        for (let i=0; i<announcements.length; i+=numberOfAnnouncementsPerPage) {
            paginatedAnnouncements.push(announcements.slice(i,i+numberOfAnnouncementsPerPage));
        }
        setPaginatedAnnouncements(paginatedAnnouncements);
    }

    useEffect(()=>{
        if (announcements.length !== 0)
        {
            paginateAnnouncements();
        }

    },[announcements])

    const getAnnouncementsForPageNumber = () => {
        setCurrentPageAnnouncements(
            paginatedAnnouncements[pageNumber-1]
        )
    }

    useEffect(()=>{
        if (paginatedAnnouncements.length !== 0)
        {
            getAnnouncementsForPageNumber();
        }
    },[paginatedAnnouncements])

    return (
        <div>
            <FiltersPanel/>
            <SortingPanel pageNumber={pageNumber}/>
            <div className="d-flex flex-column align-items-center">
                {currentPageAnnouncements.map(announcement =>
                    <div key={announcement.id} className="list-group w-30 mb-3">
                        <div className="list-group-item">{announcement.title}</div>
                        <div className="list-group-item">{announcement.description}</div>
                        <div className="list-group-item">{announcement.publishDate}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;