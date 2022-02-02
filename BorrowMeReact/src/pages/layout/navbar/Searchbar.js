import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Searchbar = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <form id="search-form" className="d-flex w-60 h-60" onSubmit={handleSubmit}>
            <input type="text" aria-label="Item name" className="w-50 px-3 border-0 rounded-start border-end"
                   placeholder="Co chcesz pożyczyć?"/>
            <div className="d-flex w-25 align-items-center">
                <LocationOnOutlinedIcon className="ps-1" id="search-location-icon"
                                        sx={{fontSize: 35, color: "#8c8c8c"}}/>
                <input id="search-location-input" type="text" aria-label="Location" className="border-0 w-100 h-100"
                       placeholder="Cała Polska"/>
            </div>
            <button id="search-btn" className="btn btn-outline-light rounded-end shadow-none" type="submit">Szukaj
            </button>
        </form>
    );
};

export default Searchbar;


