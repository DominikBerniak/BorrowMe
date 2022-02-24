import FiltersCategories from "./filtersPanel/FiltersCategories";
import "./filtersPanel/filtersPanel.css"

const FiltersPanel = () => {
    return (
        <div id="filters-container" className="d-flex flex-column align-items-center pb-5">
            <FiltersCategories />

        </div>
    );
};

export default FiltersPanel;