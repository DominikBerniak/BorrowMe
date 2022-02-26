import {useState} from "react";
import BorrowCostFilter from "./filtersMain/BorrowCostFilter";
import {useDispatch, useSelector} from "react-redux";
import {clearCostFilter} from "../../../features/costFilter";


const FiltersMain = () => {
    const [areFiltersVisible, setAreFiltersVisible] = useState(true);
    const dispatch = useDispatch();
    const costFilter = useSelector(state => state.costFilter.value);

    const toggleFilters = () => {
        setAreFiltersVisible(prev=>!prev);
    }
    const clearFilters = () =>{
        if (costFilter.minCost !== 0 || costFilter.maxCost !== 50 || costFilter.checkedButton !== "") {
            dispatch(clearCostFilter());
        }
    }
    return (
        <div className="w-70 mt-4">
            <div className="d-flex border-bottom border-2 py-3 user-select-none align-items-center justify-content-between">
                <h2 className="filter-header" onClick={toggleFilters}>Filtry</h2>
                {areFiltersVisible &&
                    <div className="clear-filter-button" onClick={clearFilters}>wyczyść</div>
                }
            </div>
            {areFiltersVisible &&
                <div className="ms-3">
                    <BorrowCostFilter />
                </div>
            }
        </div>
    );
};

export default FiltersMain;