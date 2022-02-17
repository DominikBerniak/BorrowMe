import CategoriesDropDown from "./CategoriesDropDown";

const Categories = ({navbarCategoriesRef, toggleCategories, handleCategoryClick, buttonText, areCategoriesVisible}) => {
    return (
        <div id="categories" className="d-flex flex-column w-100 align-items-center" ref={navbarCategoriesRef}>
            <CategoriesDropDown areCategoriesVisible={areCategoriesVisible} handleCategoryClick={handleCategoryClick}/>
            <button id="categories-button" className="btn px-4 fw-light shadow-none text-center"
                    onClick={toggleCategories} onMouseEnter={toggleCategories} onMouseLeave={toggleCategories}>
                {buttonText}
            </button>

        </div>
    );
};

export default Categories;



