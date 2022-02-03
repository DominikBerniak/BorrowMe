import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import {useEffect, useState} from "react";
import {getData} from "../../../services/apiFetch";


const CategoriesDropDown = ({areCategoriesVisible}) => {
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (!isDataFetched) {
            getData("api/Categories")
                .then(categories => {
                    setCategories(categories);
                })
            setIsDataFetched(true);
        }
    }, [])


    const getGroupCategories = () => {
        const groupedCategories = [];
        const categoriesInRow = 5;
        let rowNum = 1;
        for (let i = 0; i < categories.length; i += categoriesInRow) {
            groupedCategories.push(
                <div key={rowNum} className={`row row-cols-${categoriesInRow}`}>
                    {
                        categories.slice(i, i + categoriesInRow)
                            .map(category => (
                                <button key={category.id}
                                     className="list-group-item btn btn-success shadow-none border-1 col py-5 rounded">{category.name}</button>
                            ))
                    }
                </div>
            );
            rowNum++;
        }
        return groupedCategories;
    }

    return (
        <SlideDown id="categories-dropdown" className="my-dropdown-slidedown list-group w-80">
            {areCategoriesVisible &&
                <div className="w-100 px-5 pb-5 pt-3 border border-1 rounded-bottom bg-light">
                    <h3 className="text-center mb-4">Główne kategorie</h3>
                    {getGroupCategories()}
                </div>
            }
        </SlideDown>
    );
};

export default CategoriesDropDown;