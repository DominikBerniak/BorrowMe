import FiltersCategories from "./filtersPanel/FiltersCategories";
import "./filtersPanel/filtersPanel.css"
import FiltersMain from "./filtersPanel/FiltersMain";

const FiltersPanel = () => {
    return (
        <div id="filters-container" className="d-flex flex-column align-items-center pb-5">
            <FiltersCategories />
            <FiltersMain />

        </div>
    );
};

export default FiltersPanel;