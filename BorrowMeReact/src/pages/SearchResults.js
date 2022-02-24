import FiltersPanel from "./searchResults/FiltersPanel";
import SortingPanel from "./searchResults/SortingPanel";
import {useEffect, useState} from "react";
import {getData} from "../services/apiFetch";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import SearchResultsAnnouncements from "./searchResults/SearchResultsAnnouncements";
import "./searchResults/searchResults.css"
import NoMatch from "./searchResults/NoMatch";
import {useDispatch, useSelector} from "react-redux";
import {changeSearchPhrase} from "../features/searchPhrase";
import {changeCategory} from "../features/category";
import {changeLocation} from "../features/location";


const SearchResults = () => {
    const [allFetchedAnnouncements, setAllFetchedAnnouncements] = useState([]);
    const [announcements, setAnnouncements] = useState();
    const [numberOfPages, setNumberOfPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [isFetchingData, setIsFetchingData] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const {mainCategoryParam, subCategoryParam, voivodeshipParam, cityParam} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("load")
        // let pageNum = searchParams.get("page");
        // pageNum = (pageNum === null || pageNum === "0") ? 1 : parseInt(pageNum);
        // setPageNumber(pageNum);
    }, [])

    useEffect(() => {
        console.log("reset")
        setAllFetchedAnnouncements([]);
        setIsFetchingData(false);
        let voivodeship = voivodeshipParam ? voivodeshipParam : "";
        let city = cityParam ? cityParam : "";
        let input = city !== ""? `${city}, ${voivodeship}` : voivodeship !== "" ? voivodeship : "";
        dispatch(changeLocation({
            city: city,
            voivodeship: voivodeship,
            input: input
        }));
        dispatch(changeCategory({
            mainCategory: mainCategoryParam !== "all" ? mainCategoryParam : "",
            subCategory: subCategoryParam !== "all" ? subCategoryParam : ""
        }));
        let searchPhrase = searchParams.get("search");
        searchPhrase = searchPhrase !== null ? searchPhrase : ""
        dispatch(changeSearchPhrase(searchPhrase));
    }, [mainCategoryParam, subCategoryParam, voivodeshipParam, cityParam, searchParams.get("search")])

    useEffect(() => {
        console.log("fetching")
        if (!isFetchingData) {
            if (!mainCategoryParam && !subCategoryParam)
            {
                navigate("/search-results/all/all/")
                return;
            }
            updateSearchQueries()
            if (allFetchedAnnouncements.length > 0) {
                for (let i = 0; i < allFetchedAnnouncements.length; i++) {
                    if (allFetchedAnnouncements[i].pageNumber === pageNumber) {
                        console.log("old data")
                        setAnnouncements(allFetchedAnnouncements[i].announcements);
                        return;
                    }
                }
            }
            FetchNewAnnouncements();
        }
    }, [pageNumber, allFetchedAnnouncements])

    const FetchNewAnnouncements = () => {
        console.log('%c New Data', 'color:red;')
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
        if (pageNumber < numberOfPages)
        {
            setPageNumber(prev => prev + 1);
        }
        // setAnnouncements();
    }

    const decrementPageNum = () => {
        if (pageNumber > 0)
        {
            setPageNumber(prev => prev - 1);
        }
        // setAnnouncements();
    }
    const changePageToNumber = (e,stringPageNumber) =>{
        e.preventDefault();
        let pageNumber = parseInt(stringPageNumber);
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
        // setAnnouncements();
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