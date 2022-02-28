import {useDetectClickOutside} from "react-detect-click-outside";
import {useDispatch, useSelector} from "react-redux";
import {changeLocation} from "../../../../features/location";

const CityHintsDropdown = ({hideCityHints}) => {

    const refClick = useDetectClickOutside({onTriggered: hideCityHints});
    const cityHints = useSelector(state=>state.cityHints.value);
    const dispatch = useDispatch();

    const handleCityHintClick = (cityData) => {
        dispatch(changeLocation(
    {
            city: cityData.cityName,
            voivodeship: cityData.voivodeshipName,
            input: `${cityData.cityName}, ${cityData.voivodeshipName}`
        }));
        hideCityHints();
    }

    return (
        <div id="voivodeship-container" ref={refClick} className="w-100">
            <div id="voivodeship-list" className="list-group rounded-0">
                {cityHints.map((cityData) =>
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