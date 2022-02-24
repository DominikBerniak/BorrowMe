import {useState} from "react";


const FiltersMain = () => {
    const [areFiltersVisible, setAreFiltersVisible] = useState(true);
    const toggleFilters = () => {
        setAreFiltersVisible(prev=>!prev);
    }
    const clearFilters = () =>{

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

                </div>
            }
        </div>
    );
};

export default FiltersMain;