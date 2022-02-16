import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {useEffect, useState} from "react";
import VoivodeshipsDropdown from "./VoivodeshipsDropdown";
import {getData} from "../../../services/apiFetch"
import {useNavigate} from "react-router-dom";

const Searchbar = ({searchCategory}) => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [searchLocation, setSearchLocation] = useState({
        city: "",
        voivodeship: "",
        input: ""
    });

    const [areVoivodeshipsVisible, setAreVoivodeshipsVisible] = useState(false);
    const [voivodeships, setVoivodeships] = useState();
    const [filteredCities, setFilteredCities] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        if (!voivodeships)
        {
            getData("/Voivodeships")
                .then(data=>{
                    setVoivodeships(data);
                })
        }
    },[])

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        let voivodeshipParam = searchLocation.voivodeship !== "" ? searchLocation.voivodeship + "/" : "";
        let cityParam = searchLocation.city !== "" ? searchLocation.city + "/" : "";
        let searchPhraseParam = searchPhrase !== "" ? searchPhrase : "";
        let categoryParam = searchCategory !== "" ? searchCategory + "/" : "";
        let isBackslashNeeded = categoryParam !== "" || voivodeshipParam !== "" || cityParam !== "";
        if (searchPhraseParam === "") {
            navigate(`/search-results${isBackslashNeeded ? "/" : ""}${categoryParam}${voivodeshipParam}${cityParam}`);
        } else {
            navigate({
                pathname: `/search-results${isBackslashNeeded ? "/" : ""}${categoryParam}${voivodeshipParam}${cityParam}`,
                search: `?search=${searchPhraseParam}`
            });
        }
    }

    const handleInputChange = (e, type) => {
        const inputValue = e.target.value;
        switch (type) {
            case "phrase":
                setSearchPhrase(inputValue);
                break;
            case "location":
                handleLocationChange(inputValue)
                break;
            default:
                break;
        }
    }

    const handleLocationChange = (searchValue) => {
        if (searchValue.length > 2) {
            getData(`/Cities/Search/${searchValue}`)
                .then(cities => {
                    if (cities.length === 1) {
                        let voivodeshipName = voivodeships.find(v=>v.cities.some(c=>c.name === cities[0].name)).name;
                        setSearchLocation({
                            city: cities[0].name,
                            voivodeship: voivodeshipName,
                            input: `${cities[0].name}, ${voivodeshipName}`
                        });
                    }
                })
        }

        setSearchLocation({
            city: "",
            voivodeship: "",
            input: searchValue
        });
    }

    const showVoivodeshipList = () => {
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

    const handleVoivodeshipClick = (e, voivodeship) => {
        if (voivodeship.id === 0) {
            setSearchLocation({
                city: "",
                voivodeship: "",
                input: ""
            });
        } else {
            setSearchLocation({
                city: "",
                voivodeship: voivodeship.name,
                input: voivodeship.name
            })
        }
        hideVoivodeshipDropdown();
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

    const handleCityClick = (e, voivodeshipName, city) => {
        setSearchLocation({
            city: city.name,
            voivodeship: voivodeshipName,
            input: `${city.name}, ${voivodeshipName}`
        });
        hideVoivodeshipDropdown();
    }

    return (
        <form id="search-form" className="d-flex w-60 h-60" onSubmit={handleSearchSubmit}>
            <input type="text" aria-label="Item name" className="w-50 px-3 border-0 rounded-start border-end"
                   placeholder="Co chcesz pożyczyć?" value={searchPhrase}
                   onChange={(e) => handleInputChange(e, "phrase")}/>
            <div id="city-search-container" className="d-flex w-30 align-items-center flex-wrap">
                <LocationOnOutlinedIcon className="ps-1" id="search-location-icon"
                                        sx={{fontSize: 35, color: "#8c8c8c"}}/>
                <input id="search-location-input" type="text" aria-label="Location" className="border-0 w-100 h-100"
                       placeholder="Cała Polska" value={searchLocation.input}
                       onChange={(e) => handleInputChange(e, "location")}
                       onClick={(e) => showVoivodeshipList(e)} autoComplete="off"/>
                {areVoivodeshipsVisible &&
                    <VoivodeshipsDropdown hideVoivodeshipDropdown={hideVoivodeshipDropdown}
                                          handleVoivodeshipClick={handleVoivodeshipClick}
                                          handleVoivodeshipHover={handleVoivodeshipHover}
                                          voivodeships={voivodeships}
                                          filteredCities = {filteredCities}
                                          handleCityClick={handleCityClick}/>
                }
            </div>
            <button id="search-btn" className="btn btn-outline-light rounded-end shadow-none" type="submit">Szukaj
            </button>
        </form>
    );
};

export default Searchbar;
