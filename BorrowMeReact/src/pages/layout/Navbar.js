import Searchbar from "./navbar/Searchbar";
import UserSection from "./navbar/UserSection";
import {Link} from "react-router-dom";
import Categories from "./navbar/Categories";
import {useSelector} from "react-redux";
import AuthenticateLinks from "./navbar/AuthenticateLinks";

const Navbar = ({navBarRef, navbarCategoriesRef}) => {
    const authUser = useSelector(state=>state.authUser.value)
    return (
        <nav id="navbar-container" className="fixed-top h-9" ref={navBarRef}>
            <div id="navbar-main" className="h-100 d-flex align-items-center">
                <Link className="navbar-brand ms-3 text-white" to="/">BorrowMe</Link>
                <div className="d-flex align-items-center w-100 h-100">
                    <Searchbar />
                    {authUser.userId !== "" ?
                        <UserSection/>
                        :
                        <AuthenticateLinks />
                    }
                </div>
            </div>
            <Categories navbarCategoriesRef={navbarCategoriesRef}
            />
        </nav>
    );
};

export default Navbar;