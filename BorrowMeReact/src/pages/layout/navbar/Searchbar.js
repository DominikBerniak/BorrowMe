import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import VoivodeshipsDropdown from "./VoivodeshipsDropdown";
import CityHintsDropdown from "./CityHintsDropdown";

const Searchbar = ({
                       searchLocation, searchPhrase, handleSearchSubmit,
                       handleSearchInputChange,
                       showVoivodeshipList,
                       areVoivodeshipsVisible,
                       areCityHintsVisible,
                       hideVoivodeshipDropdown,
                       handleVoivodeshipClick,
                       handleVoivodeshipHover,
                       filteredCities,
                       handleCityClick,
                       voivodeships,
                       hideCityHints,
                       cityHints,
                       handleCityHintClick
                   }) => {


    return (
        <form id="search-form" className="d-flex w-60 h-60" onSubmit={handleSearchSubmit}>
            <input type="text" aria-label="Item name" className="w-50 px-3 border-0 rounded-start border-end"
                   placeholder="Co chcesz pożyczyć?" value={searchPhrase}
                   onChange={(e) => handleSearchInputChange(e, "phrase")}/>
            <div id="city-search-container" className="d-flex w-30 align-items-center flex-wrap">
                <LocationOnOutlinedIcon className="ps-1" id="search-location-icon"
                                        sx={{fontSize: 35, color: "#8c8c8c"}}/>
                <input id="search-location-input" type="text" aria-label="Location" className="border-0 w-100 h-100"
                       placeholder="Cała Polska" value={searchLocation.input}
                       onChange={(e) => handleSearchInputChange(e, "location")}
                       onClick={(e) => showVoivodeshipList(e)} autoComplete="off"/>
                {areVoivodeshipsVisible &&
                    <VoivodeshipsDropdown hideVoivodeshipDropdown={hideVoivodeshipDropdown}
                                          handleVoivodeshipClick={handleVoivodeshipClick}
                                          handleVoivodeshipHover={handleVoivodeshipHover}
                                          voivodeships={voivodeships}
                                          filteredCities={filteredCities}
                                          handleCityClick={handleCityClick}/>
                }
                {areCityHintsVisible &&
                    <CityHintsDropdown
                        hideCityHints={hideCityHints}
                        cityHits={cityHints}
                        handleCityHintClick={handleCityHintClick}
                    />
                }
            </div>
            <button id="search-btn" className="btn btn-outline-light rounded-end shadow-none" type="submit">Szukaj
            </button>
        </form>
    );
};

export default Searchbar;
