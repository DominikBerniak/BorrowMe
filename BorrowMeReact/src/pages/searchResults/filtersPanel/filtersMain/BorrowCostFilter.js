import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeCostFilter} from "../../../../features/costFilter";


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Slider from '@mui/material/Slider';
import {useNavigate} from "react-router-dom";

const BorrowCostFilter = () => {
    const [areCostFiltersVisible, setAreCostFiltersVisible] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const costFilter = useSelector(state => state.costFilter.value);
    const [checkedRadio, setCheckedRadio] = useState("");
    const [sliderValues, setSliderValues] = useState([costFilter.minCost, costFilter.maxCost]);
    const [sliderTimeout, setSliderTimeout] = useState(null);

    const toggleCostFilter = () => {
        setAreCostFiltersVisible(prev => !prev);
    }

    useEffect(() =>
            () => clearTimeout(sliderTimeout)
        , [sliderTimeout]
    )


    const handleSliderChange = (event, newValues) => {
        if (sliderTimeout) {
            clearTimeout(sliderTimeout);
        }
        setSliderTimeout(
            setTimeout(() => {
                console.log(`slider values: ${newValues[0]} / ${newValues[1]}`)
                dispatch(changeCostFilter({
                    minCost: newValues[0],
                    maxCost: newValues[1],
                    checkedButton: ""
                }));
            }, 1500)
        )
        setCheckedRadio("");
        setSliderValues(newValues);
    }
    useEffect(() => {
        setCheckedRadio(costFilter.checkedButton);
        setSliderValues([costFilter.minCost, costFilter.maxCost]);
    }, [costFilter])


    const handleCostFiltersRadioChange = (filterValue) => {
        switch (filterValue) {
            case "za darmo":
                dispatch(changeCostFilter({
                    minCost: 0,
                    maxCost: 0,
                    checkedButton: filterValue
                }));
                setCheckedRadio(filterValue);
                setSliderValues([0, 0]);
                break;
            case "<5":
                dispatch(changeCostFilter({
                    minCost: 0,
                    maxCost: 5,
                    checkedButton: filterValue
                }));
                setCheckedRadio(filterValue);
                setSliderValues([0, 5]);
                break;
            case "5-10":
                dispatch(changeCostFilter({
                    minCost: 5,
                    maxCost: 10,
                    checkedButton: filterValue
                }));
                setCheckedRadio(filterValue);
                setSliderValues([5, 10]);
                break;
            case "10-20":
                dispatch(changeCostFilter({
                    minCost: 10,
                    maxCost: 20,
                    checkedButton: filterValue
                }));
                setCheckedRadio(filterValue);
                setSliderValues([10, 20]);
                break;
            case ">20":
                dispatch(changeCostFilter({
                    minCost: 20,
                    maxCost: 50,
                    checkedButton: filterValue
                }));
                setCheckedRadio(filterValue);
                setSliderValues([20, 50]);
                break;
        }
    }

    return (
        <div>
            <div className={"main-category user-select-none py-2 d-flex justify-content-between align-items-center "}
                 onClick={toggleCostFilter}
            >
                Koszt wypożycznia
                {areCostFiltersVisible &&
                    <KeyboardArrowUpOutlinedIcon/>
                }
            </div>
            {areCostFiltersVisible &&
                <div className="user-select-none ps-3 ms-2">
                    <RadioGroup className="" value={checkedRadio}
                                onChange={(e) => handleCostFiltersRadioChange(e.target.value)}>
                        <FormControlLabel value="za darmo" control={<Radio/>} label="za darmo"/>
                        <FormControlLabel value="<5" control={<Radio/>} label="poniżej 5 zł / dzień"/>
                        <FormControlLabel value="5-10" control={<Radio/>} label="5 - 10 zł / dzień"/>
                        <FormControlLabel value="10-20" control={<Radio/>} label="10 - 20 zł / dzień"/>
                        <FormControlLabel value=">20" control={<Radio/>} label="powyżej 20 zł / dzień"/>
                    </RadioGroup>
                    <div className="d-flex justify-content-between mt-3 mb-2">
                        <div className="cost-slider-values w-25 rounded text-center p-1">{sliderValues[0]}</div>
                        <div className="cost-slider-values w-25 rounded text-center p-1">{sliderValues[1]}</div>
                    </div>
                    <Slider
                        value={sliderValues}
                        onChange={handleSliderChange}
                        disableSwap
                        className="cost-slider"
                        min={0}
                        max={50}
                    />
                </div>
            }
        </div>
    );
};

export default BorrowCostFilter;