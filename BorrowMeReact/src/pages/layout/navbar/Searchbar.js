import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {useEffect, useState} from "react";
import VoivodeshipsDropdown from "./VoivodeshipsDropdown";

const Searchbar = () => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [isVoivodeshipListVisible, setIsVoivodeshipListVisible] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [citySearchElemParams, setCitySearchElemParams] = useState({});

    const fetchCities = async () => {
        const res = await fetch("api/Cities");
        return await res.json();
    }
    useEffect(() => {
        if (!isDataFetched) {
            fetchCities()
                .then(cities => {
                    setCities(cities);
                })


            setIsDataFetched(true);
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Szukany przdmiot: " + searchPhrase + " w lokalizacji: " + searchCity)
    }

    const handleInputChange = (e, type) => {
        const inputValue = e.target.value;
        switch (type) {
            case "phrase":
                setSearchPhrase(inputValue);
                break;
            case "city":
                setSearchCity(inputValue);
                break;
            default:
                break;
        }
    }

    const showVoivodeshipList = (e) => {
        if (!isVoivodeshipListVisible) {
            setIsVoivodeshipListVisible(true);
            setCitySearchElemParams({
                leftOffset: e.target.offsetLeft,
                topOffset: e.target.offsetTop,
                width: e.target.offsetWidth,
                height: e.target.offsetHeight
            })
        }
    }
    const hideVoivodeshipList = () => {
        if (isVoivodeshipListVisible) {
            setIsVoivodeshipListVisible(false);
            setFilteredCities([])
            setCitySearchElemParams({})
        }
    }

    const handleVoivodeshipClick = (e, option) => {
        if (option.id === 0) {
            setSearchCity("");
        } else {
            setSearchCity(option.name)
        }
        hideVoivodeshipList();
    }

    const handleVoivodeshipHover = (e, option) => {
        if (option.id === 0) {
            setFilteredCities([])
            return;
        }
        setFilteredCities(
            cities.filter(city =>
                city.voivodeship.name === option.name
            ))
    }

    const handleCityClick = (e, city) => {
        setSearchCity(`${city.name}, ${city.voivodeship.name}`)
        hideVoivodeshipList();
    }

    return (
        <form id="search-form" className="d-flex w-60 h-60" onSubmit={handleSubmit}>
            <input type="text" aria-label="Item name" className="w-50 px-3 border-0 rounded-start border-end"
                   placeholder="Co chcesz pożyczyć?" value={searchPhrase}
                   onChange={(e) => handleInputChange(e, "phrase")}/>
            <div className="d-flex w-30 align-items-center">
                <LocationOnOutlinedIcon className="ps-1" id="search-location-icon"
                                        sx={{fontSize: 35, color: "#8c8c8c"}}/>
                <input id="search-location-input" type="text" aria-label="Location" className="border-0 w-100 h-100"
                       placeholder="Cała Polska" value={searchCity} onChange={(e) => handleInputChange(e, "city")}
                       onClick={(e) => showVoivodeshipList(e)} autoComplete="off"/>
            </div>
            <button id="search-btn" className="btn btn-outline-light rounded-end shadow-none" type="submit">Szukaj
            </button>
            {isVoivodeshipListVisible &&
                <VoivodeshipsDropdown hideVoivodeshipList={hideVoivodeshipList}
                                      handleVoivodeshipClick={handleVoivodeshipClick}
                                      handleVoivodeshipHover={handleVoivodeshipHover} filteredCities={filteredCities}
                                      citySearchPosition={citySearchElemParams}
                                      handleCityClick={handleCityClick}/>
            }
        </form>
    );
};

export default Searchbar;
