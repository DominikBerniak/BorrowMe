import {useState} from "react";
import CategoriesDropDown from "./CategoriesDropDown";

const Categories = () => {
    const [areCategoriesVisible, setAreCategoriesVisible] = useState(false);
    const [buttonText, setButtonText] = useState("Kategorie")
    const toggleDropDown = () => {
        setAreCategoriesVisible(prevCheck => !prevCheck)
    }
    const handleButtonHover = (e) => {
            switch (e.type)
            {
                case "mouseenter":
                    setButtonText(areCategoriesVisible? "Ukryj kategorie" : "Pokaż kategorie" );
                    break;
                case "mouseleave":
                    setButtonText("Kategorie");
                    break;
            }
    }
    return (
        <div id="categories" className="d-flex flex-column w-100 align-items-center">
            <CategoriesDropDown areCategoriesVisible={areCategoriesVisible}/>
            <button id="categories-button" className="btn px-4 fw-light shadow-none text-center"
                    onClick={toggleDropDown} onMouseEnter={handleButtonHover} onMouseLeave={handleButtonHover}>
                {buttonText}
            </button>

        </div>
    );
};

export default Categories;



