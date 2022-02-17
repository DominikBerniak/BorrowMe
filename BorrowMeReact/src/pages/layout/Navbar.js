import Searchbar from "./navbar/Searchbar";
import UserSection from "./navbar/UserSection";
import {Link, useNavigate} from "react-router-dom";
import Categories from "./navbar/Categories";
import {useEffect, useState} from "react";
import {buttonTexts} from "./navbar/categoriesUtils";
import {getData} from "../../services/apiFetch";

const Navbar = ({navBarRef, navbarCategoriesRef}) => {
    const [searchCategory, setSearchCategory] = useState("");
    const [areCategoriesVisible, setAreCategoriesVisible] = useState(false);
    const [categoriesButtonText, setCategoriesButtonText] = useState(buttonTexts.hidden)
    const [voivodeships, setVoivodeships] = useState();
    const [searchPhrase, setSearchPhrase] = useState("");
    const [searchLocation, setSearchLocation] = useState({
        city: "",
        voivodeship: "",
        input: ""
    });
    const [areVoivodeshipsVisible, setAreVoivodeshipsVisible] = useState(false);
    const [filteredCities, setFilteredCities] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (!voivodeships) {
            getData("/Voivodeships")
                .then(data => {
                    setVoivodeships(data);
                })
        }
    }, [])
    const toggleCategories = (e) => {
        if (!e) {
            setAreCategoriesVisible(prevCheck => !prevCheck);
            return;
        }
        switch (e.type) {
            case "click":
                setAreCategoriesVisible(prevCheck => !prevCheck);
                break;
            case "mouseenter":
                setCategoriesButtonText(areCategoriesVisible ? buttonTexts.hide : buttonTexts.show);
                break;
            case "mouseleave":
                setCategoriesButtonText(areCategoriesVisible ? buttonTexts.hide : buttonTexts.hidden);
                break;
            default:
                break;
        }
    }
    const handleCategoryClick = (categoryName) => {
        setSearchCategory(categoryName)
        toggleCategories();
    }
    useEffect(()=>{
        if (searchCategory !== "")
        {
            handleSearchSubmit();
        }
    },[searchCategory])

    const handleSearchSubmit = (e) => {
        if (e)
        {
            e.preventDefault();
        }
        let voivodeshipParam = searchLocation.voivodeship !== "" ? searchLocation.voivodeship + "/" : "";
        let cityParam = searchLocation.city !== "" ? searchLocation.city + "/" : "";
        let searchPhraseParam = searchPhrase !== "" ? searchPhrase : "";
        let mainCategoryParam = searchCategory !== "" ? searchCategory + "/" : "";
        let subCategoryParam = "";
        let isBackslashNeeded = mainCategoryParam !== "" || voivodeshipParam !== "" || cityParam !== "";
        if (searchPhraseParam === "") {
            navigate(`/search-results${isBackslashNeeded ? "/" : ""}${mainCategoryParam}${subCategoryParam}${voivodeshipParam}${cityParam}`);
        } else {
            navigate({
                pathname: `/search-results${isBackslashNeeded ? "/" : ""}${mainCategoryParam}${subCategoryParam}${voivodeshipParam}${cityParam}`,
                search: `?search=${searchPhraseParam}`
            });
        }
    }

    const handleSearchInputChange = (e, type) => {
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
                        let voivodeshipName = voivodeships.find(v => v.cities.some(c => c.name === cities[0].name)).name;
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

    const handleCityClick = (e, voivodeshipName, city) => {
        setSearchLocation({
            city: city.name,
            voivodeship: voivodeshipName,
            input: `${city.name}, ${voivodeshipName}`
        });
        hideVoivodeshipDropdown();
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

    return (
        <nav id="navbar-container" className="fixed-top h-9" ref={navBarRef}>
            <div id="navbar-main" className="h-100 d-flex align-items-center">
                <Link className="navbar-brand ms-3 text-white" to="/">BorrowMe</Link>
                <div className="d-flex align-items-center w-100 h-100">
                    <Searchbar searchLocation={searchLocation}
                               searchPhrase={searchPhrase}
                               handleSearchSubmit={handleSearchSubmit}
                               handleSearchInputChange={handleSearchInputChange}
                               showVoivodeshipList={showVoivodeshipList}
                               areVoivodeshipsVisible={areVoivodeshipsVisible}
                               hideVoivodeshipDropdown={hideVoivodeshipDropdown}
                               handleVoivodeshipClick={handleVoivodeshipClick}
                               handleVoivodeshipHover={handleVoivodeshipHover}
                               filteredCities={filteredCities}
                               handleCityClick={handleCityClick}
                               voivodeships={voivodeships}

                    />
                    <UserSection/>
                </div>
            </div>
            <Categories navbarCategoriesRef={navbarCategoriesRef}
                        toggleCategories={toggleCategories}
                        handleCategoryClick={handleCategoryClick}
                        buttonText={categoriesButtonText}
                        areCategoriesVisible={areCategoriesVisible}
            />
        </nav>
    );
};

export default Navbar;