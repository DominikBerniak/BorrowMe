import {useState} from "react";
import CategoriesDropDown from "./CategoriesDropDown";

const Categories = ({navbarCategoriesRef}) => {
    const [areCategoriesVisible, setAreCategoriesVisible] = useState(false);
    const buttonTexts ={
        hidden: "Kategorie",
        show: "Pokaż kategorie",
        hide: "Ukryj kategorie"
    }
    const [buttonText, setButtonText] = useState(buttonTexts.hidden)

    const handleButtonAction = (e) => {
        switch (e.type) {
            case "click":
                setAreCategoriesVisible(prevCheck => !prevCheck);
                break;
            case "mouseenter":
                setButtonText(areCategoriesVisible ? buttonTexts.hide : buttonTexts.show);
                break;
            case "mouseleave":
                setButtonText(areCategoriesVisible ? buttonTexts.hide : buttonTexts.hidden);
                break;
            default:
                break;
        }
    }
    return (
        <div id="categories" className="d-flex flex-column w-100 align-items-center" ref={navbarCategoriesRef}>
            <CategoriesDropDown areCategoriesVisible={areCategoriesVisible}/>
            <button id="categories-button" className="btn px-4 fw-light shadow-none text-center"
                    onClick={handleButtonAction} onMouseEnter={handleButtonAction} onMouseLeave={handleButtonAction}>
                {buttonText}
            </button>

        </div>
    );
};

export default Categories;



