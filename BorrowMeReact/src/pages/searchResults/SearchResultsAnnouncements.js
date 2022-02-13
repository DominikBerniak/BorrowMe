import Spinner from "../../components/Spinner";

const SearchResultsAnnouncements = ({announcements}) => {
    return (
        <div id="search-results-container" className="d-flex flex-column align-items-center">
            {announcements ?
                announcements.map(announcement =>
                <div key={announcement.id} className="list-group w-30 mb-3">
                    <div className="list-group-item">{announcement.title}</div>
                    <div className="list-group-item">{announcement.description}</div>
                    <div className="list-group-item">{announcement.publishDate}</div>
                    <div className="list-group-item">{announcement.city.name}</div>
                </div>
            )
            : <Spinner />
            }
        </div>
    );
};

export default SearchResultsAnnouncements;