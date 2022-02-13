import {useDetectClickOutside} from "react-detect-click-outside";
import {voivodeships} from "../../../data/voivodeships";

const VoivodeshipsDropdown = ({
                                  hideVoivodeshipDropdown, handleVoivodeshipClick, handleVoivodeshipHover,
                                  filteredCities, handleCityClick
                              }) => {

    const updateCitiesContainerPosition = (e) => {
        const citiesContainer = document.getElementById("cities-container");
        citiesContainer.style.top = `${e.target.offsetTop}px`;
        citiesContainer.style.left = `${e.target.offsetLeft + e.target.offsetWidth - 2}px`;
    }
    const ref = useDetectClickOutside({onTriggered: hideVoivodeshipDropdown});

    return (
        <div id="voivodeship-container" ref={ref} className="w-100">
            <div id="voivodeship-list" className="list-group rounded-0">
                {voivodeships.map((option) =>
                    <button type="button" key={option.id}
                            className="list-group-item voivodeship-button btn rounded-0 shadow-none p-2"
                            onClick={(e) => {
                                handleVoivodeshipClick(e, option)
                            }}
                            onMouseOver={(e) => {
                                handleVoivodeshipHover(e, option)
                                updateCitiesContainerPosition(e)
                            }}>
                        {option.name}
                    </button>
                )}
            </div>
            <div id="cities-container" className="list-group">
                {filteredCities.map(city =>
                    <button type="button" key={city.id}
                            className="list-group-item btn city-button rounded-0 shadow-none "
                            onClick={(e) => handleCityClick(e, city)
                            }>
                        {city.name}
                    </button>
                )}
            </div>
        </div>
    );
};

export default VoivodeshipsDropdown;