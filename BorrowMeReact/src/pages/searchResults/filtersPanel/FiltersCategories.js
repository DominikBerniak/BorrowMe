import {useEffect, useState} from "react";
import {getData} from "../../../services/apiFetch";
import MainCategory from "./filtersCategories/MainCategory";
import Spinner from "../../../components/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {clearCategory} from "../../../features/category";

const FiltersCategories = () => {
    const [areCategoriesVisible, setAreCategoriesVisible] = useState(true);

    const dispatch = useDispatch();
    const allCategories = useSelector(state => state.allCategories.value)

    const toggleCategories = () => {
        setAreCategoriesVisible(prev=>!prev);
    }
    const clearCategoryFilter = () =>{
        dispatch(clearCategory())
    }

    return (
        <div className="w-70 mt-4">
            <div className="d-flex border-bottom border-2 py-3 user-select-none align-items-center justify-content-between flex-wrap">
                <h2 className="filter-header" onClick={toggleCategories}>Kategorie</h2>
                {areCategoriesVisible &&
                    <div className="clear-filter-button ms-2" onClick={clearCategoryFilter}>wyczyść</div>
                }
            </div>
            {areCategoriesVisible &&
                <div className="ms-3">
                    {allCategories.map(mainCategory =>
                        <MainCategory key={mainCategory.id} mainCategoryData={mainCategory}/>
                    )}
                </div>
            }
        </div>
    );
};

export default FiltersCategories;