import {useDetectClickOutside} from "react-detect-click-outside";
import {voivodeships} from "../../../data/voivodeships";
import {useEffect} from "react";

const VoivodeshipsDropdown = ({ hideVoivodeshipList, handleVoivodeshipClick, handleVoivodeshipHover,
                                filteredCities, citySearchPosition, handleCityClick}) => {

    const updateCitiesContainerPosition = (e) => {
        const citiesContainer = document.getElementById("cities-container");
        citiesContainer.style.top = `${e.target.offsetTop}px`;
        citiesContainer.style.left = `${e.target.offsetLeft + e.target.offsetWidth - 2}px`;
    }
    const updateVoivodeshipContainerStyle = () => {
        const voivodeshipContainer = document.getElementById("voivodeship-container");
        voivodeshipContainer.style.top = `${citySearchPosition.topOffset + citySearchPosition.height}px`;
        voivodeshipContainer.style.left = `${citySearchPosition.leftOffset}px`;
        voivodeshipContainer.style.width = `${citySearchPosition.width}px`;
        voivodeshipContainer.style.display = "block";
    }
    useEffect(() => {
        updateVoivodeshipContainerStyle();
    }, [citySearchPosition])

    const ref = useDetectClickOutside({onTriggered: hideVoivodeshipList});

    return (
        <div id="voivodeship-container" ref={ref}>
            <div id="voivodeship-list" className="list-group rounded-0">
                {voivodeships.map((option) =>
                    <button key={option.id} className="list-group-item voivodeship-button btn rounded-0 shadow-none p-2"
                        onClick={(e) => { handleVoivodeshipClick(e, option) }}
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
                    <button key={city.id} className="list-group-item btn btn-primary rounded-0 shadow-none "
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