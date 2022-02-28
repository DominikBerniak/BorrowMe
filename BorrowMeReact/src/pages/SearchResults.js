import FiltersPanel from "./searchResults/FiltersPanel";
import SortingPanel from "./searchResults/SortingPanel";
import {useEffect, useState} from "react";
import {getData} from "../services/apiFetch";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import SearchResultsAnnouncements from "./searchResults/SearchResultsAnnouncements";
import "./searchResults/searchResults.css"
import NoMatch from "./searchResults/searchResultsAnnouncements/NoMatch";
import {useDispatch, useSelector} from "react-redux";
import {changeSearchPhrase} from "../features/searchPhrase";
import {changeCategory} from "../features/category";
import {changeLocation, clearLocation} from "../features/location";


const SearchResults = () => {
    const [allFetchedAnnouncements, setAllFetchedAnnouncements] = useState([]);
    const [announcements, setAnnouncements] = useState();
    const [numberOfPages, setNumberOfPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const {mainCategoryParam, subCategoryParam, voivodeshipParam, cityParam} = useParams();

    const searchCategory = useSelector(state => state.category.value);
    const searchLocation = useSelector(state => state.location.value);
    const searchPhrase = useSelector(state => state.searchPhrase.value);
    const costFilter = useSelector(state => state.costFilter.value);
    const sortFilter = useSelector(state=>state.sort.value);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let pageNum = searchParams.get("page");
        pageNum = pageNum ? parseInt(pageNum) : 1;
        setPageNumber(pageNum);
        if (mainCategoryParam !== searchCategory.mainCategory) {
            dispatch(changeCategory({
                mainCategory: mainCategoryParam,
                subCategory: searchCategory.subCategory
            }));
        }
        if (subCategoryParam !== searchCategory.subCategory) {
            dispatch(changeCategory({
                mainCategory: mainCategoryParam,
                subCategory: subCategoryParam
            }));
        }
        if (!voivodeshipParam && !cityParam) {
            dispatch(clearLocation())
        }
        if (voivodeshipParam && !cityParam && voivodeshipParam !== searchLocation.voivodeship) {
            dispatch(changeLocation({
                city: "all",
                voivodeship: voivodeshipParam,
                input: voivodeshipParam
            }))
        }

        if (cityParam && cityParam !== searchLocation.city) {
            dispatch(changeLocation({
                city: cityParam,
                voivodeship: voivodeshipParam,
                input: `${cityParam}, ${voivodeshipParam}`
            }))
        }
        let searchPhraseParam = searchParams.get("search");
        searchPhraseParam = searchPhraseParam !== null ? searchPhraseParam : ""
        if (searchPhraseParam !== searchPhrase) {
            dispatch(changeSearchPhrase(
                searchPhraseParam
            ))
        }
        setIsInitialLoad(false);
    }, [])

    useEffect(() => {
        console.log("category change")
        let location = searchLocation.city !== "all" ? `${searchLocation.voivodeship}/${searchLocation.city}`
            : searchLocation.voivodeship !== "all" ? searchLocation.voivodeship : "";
        let searchPhraseParam = searchParams.get("search");
        if (!searchPhraseParam) {
            navigate(`/search-results/${searchCategory.mainCategory}/${searchCategory.subCategory}/${location}`);
        } else {
            navigate({
                pathname: `/search-results/${searchCategory.mainCategory}/${searchCategory.subCategory}/${location}`,
                search: `?search=${searchPhraseParam}`
            });
        }
    }, [searchCategory])

    useEffect(() => {
        console.log("reset")
        setAllFetchedAnnouncements([]);
        setAnnouncements();
        setIsFetchingData(false);
        setPageNumber(1);
    }, [mainCategoryParam, subCategoryParam, voivodeshipParam, cityParam, searchParams.get("search"), costFilter, sortFilter])

    useEffect(() => {
        console.log("tries to fetch")
        if (!isFetchingData) {
            console.log("is fetching")
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

    const getCorrectFetchUrl = (pageNum) => {
        let category = subCategoryParam !== "all" ? subCategoryParam : mainCategoryParam;
        let voivodeship = voivodeshipParam ? voivodeshipParam : "all";
        let city = cityParam ? cityParam : "all";
        let searchPhraseParam = searchParams.get("search");
        searchPhraseParam = searchPhraseParam ? searchPhraseParam : "all";

        let categoryQuery = `category=${category}`;
        let locationQuery = `&voivodeship=${voivodeship}&city=${city}`;
        let searchPhraseQuery = `&searchPhrase=${searchPhraseParam}`;
        let pageNumQuery = `&page=${isInitialLoad ? pageNum : pageNumber}`;
        let costFilterQuery = `&costMin=${costFilter.minCost}&costMax=${costFilter.maxCost}`;
        let sortQuery = `&sortBy=${sortFilter.sortBy}&sortDirection=${sortFilter.sortDirection}`;
        return "/Announcements?" + categoryQuery + locationQuery + searchPhraseQuery + pageNumQuery + costFilterQuery + sortQuery;
    }
    const FetchNewAnnouncements = () => {
        console.log('%c New Data', 'color:red;')
        setIsFetchingData(true);
        let pageNum = searchParams.get("page");
        pageNum = pageNum ? parseInt(pageNum) : 1;
        let fetchUrl = getCorrectFetchUrl(pageNum);
        console.log(fetchUrl)
        getData(fetchUrl)
            .then(data => {
                if (data === "Not Found") {
                    setAllFetchedAnnouncements();
                    setAnnouncements(data);
                    setIsFetchingData(false);
                    return;
                }
                if (data.status === 2) {
                    console.log("wrong page number")
                    setIsFetchingData(false);
                    if (pageNum > data.numberOfPages) {
                        changePageToNumber(null, data.numberOfPages)
                    } else if (pageNum < 1) {
                        changePageToNumber(null, 1)
                    }
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
        let pageNumQuery;
        if (isInitialLoad) {
            let pageNum = searchParams.get("page");
            pageNumQuery = !pageNum || pageNum === "1" ? "" : `page=${pageNum}`;
        } else {
            pageNumQuery = pageNumber === 1 ? "" : `page=${pageNumber}`;
        }
        let searchQuery = searchParams.get("search");
        if (searchQuery === "" || searchQuery === null) {
            setSearchParams(pageNumQuery);
        } else {
            if (pageNumber === 1) {
                setSearchParams({search: searchQuery});
            } else {
                setSearchParams({
                    search: searchQuery,
                    page: pageNumQuery
                })
            }
        }
    }
    const incrementPageNum = () => {
        if (pageNumber < numberOfPages) {
            setPageNumber(prev => prev + 1);
        }
    }

    const decrementPageNum = () => {
        if (pageNumber > 0) {
            setPageNumber(prev => prev - 1);
        }
    }
    const changePageToNumber = (e, stringPageNumber) => {
        if (e) {
            e.preventDefault();
        }
        let pageNumber = parseInt(stringPageNumber);
        if (pageNumber > numberOfPages) {
            setPageNumber(numberOfPages);
        } else if (pageNumber < 1) {
            setPageNumber(1);
        } else {
            setPageNumber(pageNumber);
        }
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