import {useEffect, useState} from "react";
import SubCategory from "./SubCategory";
import {useSelector} from "react-redux";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const MainCategory = ({mainCategoryData}) => {
    const [areSubCategoriesVisible, setAreSubCategoriesVisible] = useState(false);
    const chosenCategory = useSelector(state=>state.category.value);

    useEffect(()=>{
        if (chosenCategory.mainCategory === mainCategoryData.name)
        {
            setAreSubCategoriesVisible(true);
        }
        else if (chosenCategory.mainCategory === "" && chosenCategory.subCategory === "")
        {
            setAreSubCategoriesVisible(false);
        }
    },[chosenCategory])
    const toggleSubCategories = () => {
        setAreSubCategoriesVisible(prev=>!prev);
    }
    return (
        <div>
            <div onClick={toggleSubCategories}
                 className={"main-category user-select-none py-2 d-flex justify-content-between align-items-center " +
                     (chosenCategory.mainCategory === mainCategoryData.name? "chosen-main-category" : "")}>
                {mainCategoryData.name}
                {areSubCategoriesVisible &&
                    <KeyboardArrowUpOutlinedIcon />
                }
            </div>
            {areSubCategoriesVisible &&
                <div className="user-select-none border-start border-2 ps-3 ms-3">
                    <SubCategory subCategoryName="Wszystkie" mainCategoryName={mainCategoryData.name} />
                    {mainCategoryData.subCategories.map((subCategory)=>
                        <SubCategory key={subCategory.id} subCategoryName={subCategory.name} mainCategoryName={mainCategoryData.name}/>
                )}
                </div>
            }
        </div>
    );
};

export default MainCategory;