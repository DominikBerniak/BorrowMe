import Searchbar from "./navbar/Searchbar";
import UserSection from "./navbar/UserSection";
import {Link} from "react-router-dom";
import Categories from "./navbar/Categories";

const Navbar = ({navBarRef, navbarCategoriesRef}) => {
    return (
        <nav id="navbar-container" className="fixed-top h-9" ref={navBarRef}>
            <div id="navbar-main" className="h-100 d-flex align-items-center">
                <Link className="navbar-brand ms-3 text-white" to="/">BorrowMe</Link>
                <div className="d-flex align-items-center w-100 h-100">
                    <Searchbar />
                    <UserSection />
                </div>
            </div>
            <Categories navbarCategoriesRef={navbarCategoriesRef}/>
        </nav>
    );
};

export default Navbar;