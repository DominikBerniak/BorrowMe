import {useDispatch, useSelector} from "react-redux";
import {changeCategory} from "../../../../features/category";


const SubCategory = ({mainCategoryName, subCategoryName}) => {
    const dispatch = useDispatch();
    const chosenCategory = useSelector(state => state.category.value);
    const handleSubCategoryClick = () => {
        if (subCategoryName === "Wszystkie") {
            dispatch(changeCategory({
                mainCategory: mainCategoryName,
                subCategory: "all"
            }))
        } else {
            dispatch(changeCategory({
                mainCategory: mainCategoryName,
                subCategory: subCategoryName
            }))
        }
    }

    return (
        <div className={"ps-1 py-2 sub-category " + (chosenCategory.subCategory === subCategoryName ||
            (chosenCategory.mainCategory === mainCategoryName &&
            chosenCategory.subCategory === "all" &&
            subCategoryName === "Wszystkie") ? "fw-bold" : "")}
             onClick={handleSubCategoryClick}>{subCategoryName}</div>
    );
};

export default SubCategory;