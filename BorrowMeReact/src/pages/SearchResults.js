import FiltersPanel from "./searchResults/FiltersPanel";
import SortingPanel from "./searchResults/SortingPanel";
import {useEffect, useState} from "react";
import {getData} from "../services/apiFetch";
import {useParams, useSearchParams} from "react-router-dom";
import SearchResultsAnnouncements from "./searchResults/SearchResultsAnnouncements";
import "./searchResults/searchResults.css"
import Spinner from "../components/Spinner";
import NoMatch from "./searchResults/NoMatch";


const SearchResults = () => {
    const [allFetchedAnnouncements, setAllFetchedAnnouncements] = useState([]);
    const [announcements, setAnnouncements] = useState();
    const [numberOfPages, setNumberOfPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [isFetchingData, setIsFetchingData] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const {mainCategoryParam, subCategoryParam, voivodeshipParam, cityParam} = useParams();

    useEffect(() => {
        let pageNum = searchParams.get("page");
        pageNum = pageNum === null || "0" ? 1 : parseInt(pageNum);
        setPageNumber(pageNum);
    }, [])

    useEffect(() => {
        console.log("reset")
        setAllFetchedAnnouncements([]);
        setIsFetchingData(false);
        setPageNumber(1);
    }, [mainCategoryParam, subCategoryParam, voivodeshipParam, cityParam, searchParams.get("search")])

    useEffect(() => {
        if (!isFetchingData) {
            console.log("fetching")
            updateSearchQueries()
            if (allFetchedAnnouncements.length > 0) {
                console.log("old data")
                for (let i = 0; i < allFetchedAnnouncements.length; i++) {
                    if (allFetchedAnnouncements[i].pageNumber === pageNumber) {
                        setAnnouncements(allFetchedAnnouncements[i].announcements);
                        return;
                    }
                }
            }
            console.log("new data")
            setIsFetchingData(true);
            let searchPhrase = searchParams.get("search");
            searchPhrase = searchPhrase !== null ? searchPhrase : "all"

            let category = subCategoryParam !== "all" ? subCategoryParam : mainCategoryParam;
            let voivodeship = voivodeshipParam ? voivodeshipParam : "all";
            let city = cityParam ? cityParam : "all";
            console.log(`/Announcements/${category}/${voivodeship}/${city}/${searchPhrase}/${pageNumber}`)
            getData(`/Announcements?category=${category}&voivodeship=${voivodeship}&city=${city}&searchPhrase=${searchPhrase}&page=${pageNumber}`)
                .then(data => {
                    if (data === "Not Found") {
                        setAllFetchedAnnouncements();
                        setAnnouncements(data);
                        return;
                    }
                    setAnnouncements(data.announcements)
                    setNumberOfPages(data.numberOfPages);
                    setAllFetchedAnnouncements(prevState => [...prevState, {
                        pageNumber: pageNumber,
                        announcements: data.announcements
                    }])
                    setIsFetchingData(false);
                })

        }
    }, [pageNumber, allFetchedAnnouncements])

    const updateSearchQueries = () => {
        let pageNumQuery = pageNumber === 1 ? "" : `page=${pageNumber}`;
        let searchQuery = searchParams.get("search");
        if (searchQuery === "" || searchQuery === null) {
            setSearchParams(pageNumQuery);
        } else {
            if (pageNumber === 1) {
                setSearchParams({search: searchQuery});
            } else {
                setSearchParams({
                    search: searchQuery,
                    page: pageNumber
                })
            }
        }

    }
    const incrementPageNum = () => {
        setPageNumber(prev => prev + 1);
        setAnnouncements();
    }

    const decrementPageNum = () => {
        setPageNumber(prev => prev - 1);
        setAnnouncements();
    }
    const changePageToNumber = (e,pageNumber) =>{
        e.preventDefault();
        if (pageNumber > numberOfPages)
        {
            setPageNumber(numberOfPages);
        }
        else if (pageNumber < 1)
        {
            setPageNumber(1);
        }
        else
        {
            setPageNumber(pageNumber);
        }
        setAnnouncements();
    }

    return (
        <div id="main-container" className="w-90 mx-auto">
            <FiltersPanel/>
            {announcements !== "Not Found" ?
                <>
                    <SortingPanel pageNumber={pageNumber} incrementPageNum={incrementPageNum}
                                  decrementPageNum={decrementPageNum} numberOfPages={numberOfPages}
                                  announcements={announcements} changePageToNumber={changePageToNumber}
                    />
                    <SearchResultsAnnouncements announcements={announcements}/>
                </>
                :
                <NoMatch/>
            }
        </div>
    );
};

export default SearchResults;