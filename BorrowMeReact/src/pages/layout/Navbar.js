import Searchbar from "./navbar/Searchbar";
import UserSection from "./navbar/UserSection";
import {Link} from "react-router-dom";
import Categories from "./navbar/Categories";
import {useDispatch, useSelector} from "react-redux";
import AuthenticateLinks from "./navbar/AuthenticateLinks";
import {useEffect} from "react";
import {getAuthUser} from "../../services/getAuthUser";
import {changeAuthUser} from "../../features/authUser";
import {getData} from "../../services/apiFetch";
import {changeUser} from "../../features/user";

const Navbar = ({navBarRef, navbarCategoriesRef}) => {
    const user = useSelector(state => state.user.value);
    const authUser = useSelector(state => state.authUser.value);
    const dispatch = useDispatch();
    useEffect(() => {
        getAuthUser()
            .then((user) => {
                if (!user.businessUserId) {
                    console.log("User not logged in")
                    return;
                }
                dispatch(changeAuthUser({
                    userId: user.businessUserId,
                    roles: user.roles
                }))
            })
    }, [])

    useEffect(()=>{
        if (authUser.userId === "")
        {
            return;
        }
        console.log("fetching user data")
        getData(`/api/Users/${authUser.userId}`)
            .then(user=>{
                dispatch(changeUser({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    pictureName: user.pictureLocation ? user.pictureLocation.fileName : "",
                    reputationPoints: user.reputationPoints
                }))
            })
    },[authUser])

    return (
        <nav id="navbar-container" className="fixed-top h-9" ref={navBarRef}>
            <div id="navbar-main" className="h-100 d-flex align-items-center">
                <Link className="navbar-brand ms-3 text-white" to="/">BorrowMe</Link>
                <div className="d-flex align-items-center w-100 h-100">
                    <Searchbar/>
                    {user.firstName !== "" ?
                        <UserSection/>
                        :
                        <AuthenticateLinks/>
                    }
                </div>
            </div>
            <Categories navbarCategoriesRef={navbarCategoriesRef}
            />
        </nav>
    );
};

export default Navbar;