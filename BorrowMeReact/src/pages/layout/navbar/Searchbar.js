import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import VoivodeshipsDropdown from "./searchbar/VoivodeshipsDropdown";
import CityHintsDropdown from "./searchbar/CityHintsDropdown";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {useDispatch, useSelector} from "react-redux";
import {changeSearchPhrase, clearSearchPhrase} from "../../../features/searchPhrase";
import {changeLocation} from "../../../features/location";
import {setCityHints, clearCityHints} from "../../../features/cityHints";
import {getData} from "../../../services/apiFetch";
import {useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";


const Searchbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchPhrase = useSelector((state) => state.searchPhrase.value);
    const searchLocation = useSelector(state => state.location.value);
    const searchCategory = useSelector(state => state.category.value);

    const [areCityHintsVisible, setAreCityHintsVisible] = useState(false);

    const [voivodeships, setVoivodeships] = useState();
    const [areVoivodeshipsVisible, setAreVoivodeshipsVisible] = useState(false);
    const [filteredCities, setFilteredCities] = useState();
    const {mainCategoryParam} = useParams();

    useEffect(() => {
        if (!voivodeships) {
            getData("/api/Voivodeships")
                .then(data => {
                    setVoivodeships(data);
                })
        }
    }, [])

    useEffect(() => {
        if ((!mainCategoryParam && searchCategory.mainCategory !== "all")) {
            handleSearchSubmit();
        }
    }, [searchCategory])

    const handleSearchSubmit = (e) => {
        console.log("submit")
        if (e) {
            e.preventDefault();
        }
        let voivodeshipParam = searchLocation.voivodeship !== "all" ? searchLocation.voivodeship + "/" : "";
        let cityParam = searchLocation.city !== "all" ? searchLocation.city + "/" : "";
        let mainCategoryParam = searchCategory.mainCategory + "/";
        let subCategoryParam = searchCategory.subCategory + "/";
        if (searchPhrase === "") {
            navigate(`/search-results/${mainCategoryParam}${subCategoryParam}${voivodeshipParam}${cityParam}`);
        } else {
            navigate({
                pathname: `/search-results/${mainCategoryParam}${subCategoryParam}${voivodeshipParam}${cityParam}`,
                search: `?search=${searchPhrase}`
            });
        }
    }

    const showVoivodeshipDropdown = () => {
        if (!areVoivodeshipsVisible) {
            setAreVoivodeshipsVisible(true);
        }
    }
    const hideVoivodeshipDropdown = () => {
        if (areVoivodeshipsVisible) {
            setAreVoivodeshipsVisible(false)
            setFilteredCities();
        }
    }
    const handleVoivodeshipHover = (e, voivodeship) => {
        if (voivodeship.id === 0) {
            setFilteredCities();
            return;
        }
        setFilteredCities({
            voivodeshipName: voivodeship.name,
            cities: voivodeship.cities
        });
    }

    const handleLocationChange = (searchValue) => {
        if (searchValue.length > 2) {
            getData(`/api/Cities/Search/${searchValue}`)
                .then(citiesData => {
                    if (citiesData.length > 0) {
                        dispatch(setCityHints(citiesData))
                        setAreCityHintsVisible(true);
                        hideVoivodeshipDropdown();
                    }
                })
        } else {
            hideCityHints();
            showVoivodeshipDropdown();
        }
        dispatch(changeLocation(
            {
                city: "all",
                voivodeship: "all",
                input: searchValue
            }));
    }
    const hideCityHints = () => {
        dispatch(clearCityHints())
        setAreCityHintsVisible(false);
    }

    return (
        <form id="search-form" className="d-flex w-60 h-60" onSubmit={handleSearchSubmit}>
            <input type="text" aria-label="Item name" className="w-50 px-3 border-0 rounded-start"
                   placeholder="Co chcesz pożyczyć?" value={searchPhrase}
                   onChange={(e) => dispatch(changeSearchPhrase(e.target.value))}
            />
            <div className="d-flex align-items-center bg-white w-4 border-end">
                {searchPhrase !== "" &&
                    <ClearOutlinedIcon sx={{fontSize: 35, color: "#8c8c8c"}} id="searchbar-clear-input-icon"
                                       onClick={() => dispatch(clearSearchPhrase())}
                    />
                }
            </div>
            <div id="city-search-container" className="d-flex w-30 align-items-center flex-wrap">
                <LocationOnOutlinedIcon className="ps-1" id="search-location-icon"
                                        sx={{fontSize: 35, color: "#8c8c8c"}}/>
                <input id="search-location-input" type="text" aria-label="Location" className="border-0 w-100 h-100"
                       placeholder="Cała Polska" value={searchLocation.input}
                       onChange={(e) => handleLocationChange(e.target.value)}
                       onClick={(e) => showVoivodeshipDropdown(e)} autoComplete="off"/>
                {areVoivodeshipsVisible &&
                    <VoivodeshipsDropdown hideVoivodeshipDropdown={hideVoivodeshipDropdown}
                                          handleVoivodeshipHover={handleVoivodeshipHover}
                                          voivodeships={voivodeships}
                                          filteredCities={filteredCities}/>
                }
                {areCityHintsVisible &&
                    <CityHintsDropdown hideCityHints={hideCityHints}/>
                }
            </div>
            <button id="search-btn" className="btn btn-outline-light rounded-end shadow-none" type="submit">Szukaj
            </button>
        </form>
    );
};

export default Searchbar;
