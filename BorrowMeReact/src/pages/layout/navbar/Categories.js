import CategoriesDropdown from "./categories/CategoriesDropdown";
import {buttonTexts} from "./categories/categoriesUtils";
import {useState} from "react";
import {changeCategory} from "../../../features/category";
import {useDispatch} from "react-redux";


const Categories = ({navbarCategoriesRef}) => {
    const dispatch = useDispatch();
    const [areCategoriesVisible,setAreCategoriesVisible] = useState(false);
    const [categoriesButtonText, setCategoriesButtonText] = useState(buttonTexts.hidden)
    const toggleCategories = (e) => {
        if (!e) {
            setAreCategoriesVisible(prevCheck => !prevCheck);
            return;
        }
        switch (e.type) {
            case "click":
                setAreCategoriesVisible(prevCheck => !prevCheck);
                break;
            case "mouseenter":
                setCategoriesButtonText(areCategoriesVisible ? buttonTexts.hide : buttonTexts.show);
                break;
            case "mouseleave":
                setCategoriesButtonText(areCategoriesVisible ? buttonTexts.hide : buttonTexts.hidden);
                break;
            default:
                break;
        }
    }
    const handleCategoryClick = (categoryName) => {
        dispatch(changeCategory({
            mainCategory: categoryName,
            subCategory: "all"
        }));
        toggleCategories();
    }

    return (
        <div id="categories" className="d-flex flex-column w-100 align-items-center" ref={navbarCategoriesRef}>
            <CategoriesDropdown areCategoriesVisible={areCategoriesVisible} handleCategoryClick={handleCategoryClick}/>
            <button id="categories-button" className="btn px-4 fw-light shadow-none text-center"
                    onClick={toggleCategories} onMouseEnter={toggleCategories} onMouseLeave={toggleCategories}>
                {categoriesButtonText}
            </button>

        </div>
    );
};

export default Categories;



