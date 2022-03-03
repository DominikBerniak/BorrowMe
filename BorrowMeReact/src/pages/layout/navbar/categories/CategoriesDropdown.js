import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import {useEffect} from "react";
import {getData} from "../../../../services/apiFetch";
import {useDispatch, useSelector} from "react-redux";
import {changeAllCategories} from "../../../../features/allCategories";

const CategoriesDropdown = ({areCategoriesVisible, handleCategoryClick}) => {
    const dispatch = useDispatch();
    const allCategories = useSelector(state => state.allCategories.value)

    useEffect(() => {
        if (allCategories.length === 0)
        {
            getData("/api/Categories/MainCategories")
                .then(categories => {
                    dispatch(changeAllCategories(categories));
                })
        }
    }, [])

    return (
        <SlideDown id="categories-dropdown" className="w-80">
            {areCategoriesVisible &&
                <div className="w-100 px-5 pb-5 pt-3 border border-1 rounded-bottom bg-light">
                    <h3 className="text-center mb-4">Główne kategorie</h3>
                    <div className="d-flex flex-wrap">
                        {allCategories.map(category =>
                            <button key={category.id}
                                    className="list-group-item btn btn-success shadow-none border-1 col py-5 rounded flex-25"
                                    onClick={() => handleCategoryClick(category.name)}
                            >{category.name}</button>
                        )}
                    </div>
                </div>
            }
        </SlideDown>
    );
};

export default CategoriesDropdown;