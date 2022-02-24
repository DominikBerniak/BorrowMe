import {useDetectClickOutside} from "react-detect-click-outside";
import {useRef} from "react";
import {changeLocation} from "../../../../features/location";
import {useDispatch} from "react-redux";

const VoivodeshipsDropdown = ({
                                  hideVoivodeshipDropdown, handleVoivodeshipHover,
                                  voivodeships, filteredCities
                              }) => {

    const refClick = useDetectClickOutside({onTriggered: hideVoivodeshipDropdown});
    const refCities = useRef();
    const dispatch = useDispatch();


    const updateCitiesContainerPosition = (e) => {
        let cursorPositionPercent = parseInt(e.pageY / window.innerHeight * 100);
        if (cursorPositionPercent > 45) {
            refCities.current.style.bottom = `${e.target.offsetParent.offsetHeight - e.target.getBoundingClientRect().top - e.target.offsetHeight}px`;
            refCities.current.style.removeProperty("top");
        } else {
            refCities.current.style.top = `${e.target.getBoundingClientRect().top}px`;
            refCities.current.style.removeProperty("bottom");
        }
        refCities.current.style.left = `${e.target.offsetLeft + e.target.offsetWidth + 10}px`;
    }

    const handleVoivodeshipClick = (e, voivodeship) => {
        if (voivodeship.id === 0) {
            dispatch(changeLocation(
                {
                    city: "",
                    voivodeship: "",
                    input: ""
                }))
        }
        else {
            dispatch(changeLocation(
                {
                    city: "",
                    voivodeship: voivodeship.name,
                    input: voivodeship.name
                }))
        }
        hideVoivodeshipDropdown();
    }
    const handleCityClick = (e, voivodeshipName, city) => {
        dispatch(changeLocation(
    {
            city: city.name,
            voivodeship: voivodeshipName,
            input: `${city.name}, ${voivodeshipName}`
        }))
        hideVoivodeshipDropdown();
    }

    return (
        <div id="voivodeship-container" ref={refClick} className="w-100">
            <div id="voivodeship-list" className="list-group rounded-0">
                <button type="button"
                        className="list-group-item voivodeship-button btn rounded-0 shadow-none p-2"
                        onClick={(e) => {
                            handleVoivodeshipClick(e, {id: 0})
                        }}
                        onMouseOver={(e) => {
                            handleVoivodeshipHover(e, {id: 0})
                        }}>
                    Cała Polska
                </button>
                {voivodeships.map((voivodeship) =>
                    <button type="button" key={voivodeship.id}
                            className="list-group-item voivodeship-button btn rounded-0 shadow-none p-2"
                            onClick={(e) => {
                                handleVoivodeshipClick(e, voivodeship)
                            }}
                            onMouseOver={(e) => {
                                handleVoivodeshipHover(e, voivodeship)
                                updateCitiesContainerPosition(e)
                            }}>
                        {voivodeship.name}
                    </button>
                )}
            </div>
            <div id="cities-container-outer" className="w-30" ref={refCities}>
                {filteredCities &&
                    <div id="cities-container-inner" className="w-100 d-flex flex-wrap">
                        {filteredCities.cities.map(city =>
                            <button type="button" key={city.id}
                                    className="btn city-button rounded-0 shadow-none"
                                    onClick={(e) => handleCityClick(e, filteredCities.voivodeshipName, city)
                                    }>
                                {city.name}
                            </button>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default VoivodeshipsDropdown;