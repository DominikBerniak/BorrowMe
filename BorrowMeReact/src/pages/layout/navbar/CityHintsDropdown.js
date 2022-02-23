import {useDetectClickOutside} from "react-detect-click-outside";

const CityHintsDropdown = ({hideCityHints, cityHits, handleCityHintClick}) => {

    const refClick = useDetectClickOutside({onTriggered: hideCityHints});
    return (
        <div id="voivodeship-container" ref={refClick} className="w-100">
            <div id="voivodeship-list" className="list-group rounded-0">
                {cityHits.map((cityData) =>
                    <button type="button" key={cityData.cityName + cityData.voivodeshipName}
                            className="list-group-item voivodeship-button btn rounded-0 shadow-none p-2"
                            onClick={(e) => {
                                handleCityHintClick(cityData)
                            }}>
                        {`${cityData.cityName}, ${cityData.voivodeshipName}`}
                    </button>
                )}
            </div>
        </div>
    );
};

export default CityHintsDropdown;