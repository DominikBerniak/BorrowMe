import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {changeCostFilter, clearCostFilter} from "../../../../features/costFilter";


const BorrowCostFilter = () => {
    const [areCostFiltersVisible, setAreCostFiltersVisible] = useState(true);
    const dispatch = useDispatch();
    const toggleCostFilter = () => {
        setAreCostFiltersVisible(prev => !prev);
    }

    const handleCostFiltersSubmit = (filterValue) => {
        switch (filterValue)
        {
            case "za darmo":
                dispatch(clearCostFilter());
                break;
            case "<5":
                dispatch(changeCostFilter({
                    minCost: 0,
                    maxCost: 5,
                    checkedButton: filterValue
                }));
                break;
            case "5-10":
                dispatch(changeCostFilter({
                    minCost: 5,
                    maxCost: 10,
                    checkedButton: filterValue
                }));
                break;
            case "10-20":
                dispatch(changeCostFilter({
                    minCost: 10,
                    maxCost: 20,
                    checkedButton: filterValue
                }));
                break;
            case ">20":
                dispatch(changeCostFilter({
                    minCost: 0,
                    maxCost: 5,
                    checkedButton: filterValue
                }));
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
                <div className="user-select-none border-start border-2 ps-3 ms-3"
                    onChange={e=>handleCostFiltersSubmit(e.target.value)}
                >
                    <label className="d-flex align-items-center">
                        <input type="radio" value="za darmo" name="cost-filter"/>
                        <span>Za darmo</span>
                    </label>
                    <label className="d-flex align-items-center">
                        <input type="radio" value="<5" name="cost-filter"/>
                        <span>poniżej 5 zł / dzień</span>
                    </label>
                    <label className="d-flex align-items-center">
                        <input type="radio" value="5-10" name="cost-filter"/>
                        <span>5 - 10 zł / dzień</span>
                    </label>
                    <label className="d-flex align-items-center">
                        <input type="radio" value="10-20" name="cost-filter"/>
                        <span>10 - 20 zł / dzień</span>
                    </label>
                    <label className="d-flex align-items-center">
                        <input type="radio" value=">20" name="cost-filter"/>
                        <span>powyżej 20 zł / dzień</span>
                    </label>
                </div>
            }
        </div>
    );
};

export default BorrowCostFilter;