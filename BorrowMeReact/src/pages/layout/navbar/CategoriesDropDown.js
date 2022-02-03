import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

const categories = [
    {
        id: 1,
        name: "Kategoria"
    },
    {
        id: 2,
        name: "Kategoria"
    },
    {
        id: 3,
        name: "Kategoria"
    },
    {
        id: 4,
        name: "Kategoria"
    },
    {
        id: 5,
        name: "Kategoria"
    },
    {
        id: 6,
        name: "Kategoria"
    },
    {
        id: 7,
        name: "Kategoria"
    },
    {
        id: 8,
        name: "Kategoria"
    },
    {
        id: 9,
        name: "Kategoria"
    },
    {
        id: 10,
        name: "Kategoria"
    },
    {
        id: 11,
        name: "Kategoria"
    },
    {
        id: 12,
        name: "Kategoria"
    },
    {
        id: 13,
        name: "Kategoria"
    },
    {
        id: 14,
        name: "Kategoria"
    },
    {
        id: 15,
        name: "Kategoria"
    },
    {
        id: 16,
        name: "Kategoria"
    },
    {
        id: 17,
        name: "Kategoria"
    },
    {
        id: 18,
        name: "Kategoria"
    },
    {
        id: 19,
        name: "Kategoria"
    },
    {
        id: 20,
        name: "Kategoria"
    },
    {
        id: 21,
        name: "Kategoria"
    },
]


const CategoriesDropDown = ({areCategoriesVisible}) => {
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
                                     className="list-group-item btn btn-warning shadow-none border-1 col py-5 rounded">{category.name + " " + category.id}</button>
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