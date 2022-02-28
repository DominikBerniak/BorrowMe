import {useEffect, useState} from "react";
import {getData} from "../../../services/apiFetch";
import MainCategory from "./filtersCategories/MainCategory";
import Spinner from "../../../components/Spinner";
import {useDispatch } from "react-redux";
import {clearCategory} from "../../../features/category";

const FiltersCategories = () => {
    const [categories, setCategories] = useState();
    const [areCategoriesVisible, setAreCategoriesVisible] = useState(true);

    const dispatch = useDispatch();

    useEffect(()=>{
        getData("/Categories/MainCategories")
            .then(data=>{
                setCategories(data);
            })
    },[])

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
            {categories ?
                areCategoriesVisible &&
                <div className="ms-3">
                    {categories.map(mainCategory =>
                        <MainCategory key={mainCategory.id} mainCategoryData={mainCategory}/>
                    )}
                </div>
                :
                <Spinner />
            }
        </div>
    );
};

export default FiltersCategories;