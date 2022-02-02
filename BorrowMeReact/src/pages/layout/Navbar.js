import Searchbar from "./navbar/Searchbar";
import UserSection from "./navbar/UserSection";
import {Link} from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top h-9 ">
            <div className="container-fluid h-100">
                <Link className="navbar-brand ms-3" to="/">BorrowMe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse h-100" id="navbarNavAltMarkup">
                    <div className="navbar-nav align-items-center w-100 h-100">
                        <Searchbar />
                        <UserSection />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;