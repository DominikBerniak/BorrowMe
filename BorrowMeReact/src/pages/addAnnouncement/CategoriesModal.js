import {useSelector} from "react-redux";
import {useState} from "react";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import {useDetectClickOutside} from "react-detect-click-outside";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const CategoriesModal = ({handleCategorySelect, hideModal}) => {
    const allCategories = useSelector(state => state.allCategories.value)
    const [chosenMainCategory, setChosenMainCategory] = useState();
    const ref = useDetectClickOutside({onTriggered: hideModal});
    return (
        <div id="add-announcement-categories-modal-main-container" className="user-select-none">
            <div id="add-announcement-categories-modal"  ref={ref}>
                <div className="d-flex w-100 align-items-center my-4">
                    <h2 className="mx-auto ps-4">Wybierz kategorię:</h2>
                    <div className="pe-4 cursor-pointer">
                        <ClearOutlinedIcon onClick={hideModal} sx={{fontSize: 30, color: "#8c8c8c"}}/>
                    </div>
                </div>
                <div className="d-flex h-100 justify-content-center">
                    <div id="categories-modal-main-categories-container"
                         className="d-flex flex-column w-40 border-end border-2">
                        {allCategories.map(mainCategory =>
                            <div key={mainCategory.id} onMouseOver={() => setChosenMainCategory(mainCategory)}
                                 className={"p-3 border-bottom border-2 d-flex categories-modal-main-category " +
                                     (chosenMainCategory && chosenMainCategory.name === mainCategory.name ? "categories-modal-chosen-main-category" : "")
                                 }
                            >
                                <div>{mainCategory.name}</div>
                                <div className="ms-auto">
                                    <ArrowForwardIosOutlinedIcon sx={{fontSize: 20, color: "#8c8c8c"}}/>
                                </div>
                            </div>
                        )}
                    </div>
                    <div id="categories-modal-sub-categories-container"
                         className="w-50 d-flex flex-column align-items-center ">
                        {chosenMainCategory && chosenMainCategory.subCategories.map(subCategory =>
                            <div key={subCategory.id}
                                 className="w-70 my-2 categories-modal-sub-category p-3 border-bottom border-2"
                                 onClick={() => handleCategorySelect(chosenMainCategory, subCategory)}
                            >{subCategory.name}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoriesModal;